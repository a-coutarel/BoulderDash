import { Coordinates } from "./coordinates.js";
import { Diamond } from "./diamond.js";
import { Dirt } from "./dirt.js";
import { Rock } from "./rock.js";
import { Rockford } from "./rockford.js";
import { Wall } from "./wall.js";


export const MOVEUP = "move_up";
export const MOVEDOWN = "move_down";
export const MOVELEFT = "move_left";
export const MOVERIGTH = "move_right";
export const NOMOVE = "no_move";

export const T = 'T';
export const V = 'V';
export const R = 'R';
export const M = 'M';
export const P = 'P';
export const D = 'D';



const refreshTime = 100;

export class map {
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
     */
    constructor() {
        this.#update = [];
        this.#nextUpdate = [];

        this.#updatePlanned = true;

        this.#rdiamond = 0;
        this.#cdiamond = 0;
        this.#moveCount = 0;

        this.#gameOver = false;
        this.#nextMove = NONE;

        this.#initiateGrid();
    }

    /**
     * Initiates map's grid
     */
    #initiateGrid() {
        this.#grid = [];

        for (const y = 0; y < 16; ++y) {

            let line = [];

            for (const x = 0; x < 32; ++x) {
                line.push(null);
            }

            this.#grid.push(line);
        }
    }

    /**
     * Loads a game
     * @param {*} layout : disposition of the items on the map
     * @param {*} data : extra data from a saved game
     */
    loadGame(layout, data) {

        this.#gameOver = date[0];

        this.#cdiamond = data[1];
        this.#moveCount = data[2];


        this.#placeItems(layout);
    }

    /**
     * Returns the current disposition and data
     */
    saveGame() {

    }

    /**
     * Places the items on the map according to the given layout
     * @param {Array} layout : disposition of the items on the map
     */
    #placeItems(layout) {
        for (const y = 0; y < 16; ++y) {
            for (const x = 0; x < 32; ++x) {
                const itemType = layout[y][x];
                switch (itemType) {
                    case M:
                        this.#grid[y][x] = new Wall(this, new Coordinates({ x: x, y: y }));
                    case D:
                        this.#grid[y][x] = new Diamond(this, new Coordinates({ x: x, y: y }));
                        ++this.#rdiamond;
                    case T:
                        this.#grid[y][x] = new Dirt(this, new Coordinates({ x: x, y: y }));
                    case R:
                        this.#grid[y][x] = new Rock(this, new Coordinates({ x: x, y: y }));
                    case V:
                        this.#grid[y][x] = null;
                    case P:
                        this.#playerLoc = new Rockford(this, new Coordinates({ x: x, y: y }));
                        this.#grid[y][x] = new Rockford(this, new Coordinates({ x: x, y: y }));

                }
            }
        }
    }

    /**
     * Modify the next move of Rockford according to player's order
     * @param {string} order : order given by player
     */
    playerOrder(order) {
        this.#nextMove = order;
        if (!this.#updatePlanned) this.#updatePlanned = true;
    }

    get nextMove() { return this.#nextMove; }

    /**
     * runs the update of all items which need one
     */
    #runUpdate() {
        this.#updatePlanned = false;

        // actual update

        if (this.#nextMove != NOMOVE) this.#nextUpdate.push(this.#playerLoc);

        for (const coord of this.#update) if (!(this.#grid[coord.y()][coord.x()] == null)) this.#grid[coord.y()][coord.x()].update();

        // to do after the update
        this.#update = this.#nextUpdate.map((x) => x);
        this.#nextUpdate = [];
        this.#nextMove = NOMOVE;

        if (this.#updatePlanned) setTimeout(this.#runUpdate, refreshTime);
    }

    /**
     * triggers an update if none is already planned
     */
    triggerUpdate() {
        if (!this.#updatePlanned) this.#runUpdate();
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

        for (const n = 0; n < 4; ++n) {
            const neighbor = new Coordinates({ x: coord_x + lx[n], y: coord_y + ly[n] });
            if (this.#isOnMap(neighbor)) this.#addToUpdate(neighbor);
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
    getItemType(coord) { return this.#grid[coord.y][coord.x].type; }

    /**
     * Moves an item from coordA to coordB
     * @param {Coordinates} coordA coordinates where is the item
     * @param {Coordinates} coordB coordinates where to move the item
     */
    moveItem(coordA, coordB) {
        this.#grid[coordB.y][coordB.x] = this.#grid[coordA.y][coordA.x];
        this.#grid[coordA.y][coordA.x] = null;
        this.#grid[coordB.y][coordB.x].coordinates(coordB);
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