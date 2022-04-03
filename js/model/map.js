import { MapController } from "../controller/map_controller.js";
import { Coordinates } from "./coordinates.js";
import { Diamond } from "./diamond.js";
import { Dirt } from "./dirt.js";
import { DIRT, ROCK, DIAMOND, WALL, ROCKFORD } from "./generic_item.js";
import { Rock } from "./rock.js";
import { Rockford } from "./rockford.js";
import { Wall } from "./wall.js";


export const MOVEUP = "move_up";
export const MOVEDOWN = "move_down";
export const MOVELEFT = "move_left";
export const MOVERIGHT = "move_right";
export const NOMOVE = "no_move";

export const T = 'T';
export const V = 'V';
export const R = 'R';
export const M = 'M';
export const P = 'P';
export const D = 'D';



const refreshTime = 100;

export class Map {
    // controller of the map
    #controller;

    // grid used to place items
    #grid;

    // coordinates of the player
    #playerLoc;

    // stores what items need to be updated
    #update;
    // stores what items need to be updated on ne next update
    #nextUpdate;
    // stores if an update is planned after the running update
    #updatePlanned;

    // remaining diamonds
    #rdiamond;
    // diamond collected
    #cdiamond;
    // movement counter
    #moveCount;

    // the game is over
    #gameOver;

    // last player entry
    #nextMove;

    /**
     * Constructor
     * @param {any} mapController associated with the map
     */
    constructor(mapController) {
        this.#controller = mapController;
        Window.map = this;

        this.#update = [];
        this.#nextUpdate = [];

        this.#updatePlanned = true;

        this.#rdiamond = 0;
        this.#cdiamond = 0;
        this.#moveCount = 0;

        this.#gameOver = false;
        this.#nextMove = NOMOVE;

        this.#initiateGrid();
    }

    /**
     * Initiates map's grid
     */
    #initiateGrid() {
        this.#grid = [];

        for (let y = 0; y < 16; ++y) {

            let line = [];

            for (let x = 0; x < 32; ++x) {
                line.push(null);
            }

            this.#grid.push(line);
        }
    }


    /**
     * Loads a game
     * @param {Dictionnary} data : data from a saved game, including layout of the map, gameOver, cDiamond and moveCount
     */
    loadGame(data) {

        this.#gameOver = data.gameOver;

        this.#cdiamond = data.cDiamond;
        this.#moveCount = data.moveCount;

        this.#placeItems(data.layout);

        this.#runUpdate();
    }

    /**
     * Returns the current disposition and data
     * @return a dictionnary containing data from the game, including layout of the map, gameOver, cDiamond and moveCount
     */
    saveGame() {
        let data = {};

        data.gameOver = this.#gameOver;

        data.cDiamond = this.#cdiamond;
        data.moveCount = this.#moveCount;

        data.layout = this.#exportLayout();
        return data;
    }

    /**
     * Returns the current disposition
     * @return an array containing the current disposition of the map
     */
    #exportLayout() {
        let layout = [];
        for (let y = 0; y < 16; ++y) {
            let line = [];

            for (let x = 0; x < 32; ++x) {
                const VOID = "void";

                const item = this.#grid[y][x];
                let itemType = "";
                if (item == null) {
                    itemType = VOID;
                } else {
                    itemType = item.type;
                }

                switch (itemType) {
                    case WALL:
                        line.push(M);
                        break;
                    case DIAMOND:
                        line.push(D);
                        break;
                    case DIRT:
                        line.push(T);
                        break;
                    case ROCK:
                        line.push(R);
                        break;
                    case VOID:
                        line.push(V);
                        break;
                    case ROCKFORD:
                        line.push(P);
                        break;
                }
            }
            layout.push(line);
        }
        return layout;
    }

    /**
     * Places the items on the map according to the given layout
     * @param {Array} layout : disposition of the items on the map
     */
    #placeItems(layout) {
        for (let y = 0; y < 16; ++y) {
            for (let x = 0; x < 32; ++x) {
                let itemType = layout[y][x];
                switch (itemType) {
                    case M:
                        this.#grid[y][x] = new Wall(this, new Coordinates({ x: x, y: y }));
                        break;
                    case D:
                        this.#grid[y][x] = new Diamond(this, new Coordinates({ x: x, y: y }));
                        ++this.#rdiamond;
                        break;
                    case T:
                        this.#grid[y][x] = new Dirt(this, new Coordinates({ x: x, y: y }));
                        break;
                    case R:
                        this.#grid[y][x] = new Rock(this, new Coordinates({ x: x, y: y }));
                        break;
                    case V:
                        this.#grid[y][x] = null;
                        break;
                    case P:
                        this.#playerLoc = new Coordinates({ x: x, y: y });
                        this.#grid[y][x] = new Rockford(this, new Coordinates({ x: x, y: y }));
                        break;

                }
                this.#addToUpdate(new Coordinates({ x: x, y: y }));
            }
        }
    }

    /**
     * Modify the next move of Rockford according to player's order
     * @param {string} order : order given by player
     */
    playerOrder(order) {
        this.#nextMove = order;
        this.triggerUpdate();
    }

    get nextMove() { return this.#nextMove; }

    /**
     * runs the update of all items which need one
     */
    #runUpdate() {
        console.log("update");
        // the map needs to be referenced at by an absolute declaration as the function will be executed after a timeout sometimes
        let map = document.controller.map;
        map.#updatePlanned = false;

        map.#update = map.#nextUpdate.map((x) => x);
        map.#nextUpdate = [];

        // actual update

        if (map.nextMove != NOMOVE) {
            map.#update.push(map.#playerLoc);
            map.#updatePlanned = true;
        }

        console.log(map.#update);

        for (let coord of map.#update) if (!(map.#grid[coord.y][coord.x] == null)) map.#grid[coord.y][coord.x].update();

        // warns the controller of the update
        let data = {};
        data.layout = map.#exportLayout();
        data.gameOver = map.#gameOver;
        data.cDiamond = map.#cdiamond;
        data.rDiamond = map.#rdiamond;
        data.moveCount = map.#moveCount;
        map.#controller.notify(data);

        // to do after the update
        map.#nextMove = NOMOVE;

        if (map.#updatePlanned) setTimeout(map.#runUpdate, refreshTime);
    }

    /**
     * triggers an update if none is already planned
     */
    triggerUpdate() {
        if (!this.#updatePlanned) this.#runUpdate();
        else this.#updatePlanned = true;
    }

    /**
     * adds an item to nextUpdate
     * @param {Coordinates} coord : coordinates of the item to update
     */
    #addToUpdate(coord) {
        if (!this.#nextUpdate.includes(coord)) this.#nextUpdate.push(coord);
        this.#updatePlanned = true;
    }

    /**
     * adds neighbors of an item to nextUpdate
     * @param {Coordinates} coord : coordinates of the item to update
     */
    addNeighborsToUpdate(coord) {
        const coord_x = coord.x;
        const coord_y = coord.y;

        const lx = [1, 0, -1, 0];
        const ly = [0, 1, 0, -1];

        for (let n = 0; n < 4; ++n) {
            const neighbor = new Coordinates({ x: coord_x + lx[n], y: coord_y + ly[n] });
            if (this.isOnMap(neighbor)) this.#addToUpdate(neighbor);
        }

    }

    /**
     * States weather or not a given coordinate is on the map
     * @param {Coordinates} coord coordinates to check
     * @returns true if coord is on the map, otherwise false
     */
    isOnMap(coord) { return coord.x >= 0 && coord.x < 32 && coord.y >= 0 && coord.y < 16; }

    /**
     * Returns the item type at the given coordinates
     * @param {Coordinates} coord coordinates to check
     * @returns item type
     */
    getItemType(coord) {
        if (this.#grid[coord.y][coord.x] == null) return null;
        return this.#grid[coord.y][coord.x].type;
    }

    /**
     * Moves an item from coordA to coordB
     * @param {Coordinates} coordA coordinates where is the item
     * @param {Coordinates} coordB coordinates where to move the item
     */
    moveItem(coordA, coordB) {
        coordA = new Coordinates({ x: coordA.x, y: coordA.y });

        this.#grid[coordB.y][coordB.x] = this.#grid[coordA.y][coordA.x];
        this.#grid[coordA.y][coordA.x] = null;
        this.#grid[coordB.y][coordB.x].coordinates = coordB;

        if (coordA.x == this.#playerLoc.x && coordA.y == this.#playerLoc.y) this.#playerLoc = coordB;
    }

    /**
     * Updates the counter and checks for victory when a diamond is collected
     */
    collectDiamond() {
        ++this.#cdiamond;
        --this.#rdiamond;
        // Check for victory /!\ TO DO
    }

    /**
     * Updates the counter
     */
    addMovement() {
        ++this.#moveCount;
    }

    /**
     * When the player dies
     */
    death() {
        this.#gameOver = true;
    }

}









/**
 * utiliser deux listes : nextUpdate et update
 * toutes les 0.1 secondes, nextUpdate devient update et ce nouvel update est applique, remplissant le nextUpdate le cas echeant
*/