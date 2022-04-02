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
     * @param {*} layout : disposition of the items on the map
     * @param {*} data : extra data from a saved game
     */
    loadGame(layout, data) {

        this.#placeItems(layout);
    }

    /**
     * Returns the current disposition and data
     */
    saveGame() {

    }

    /**
     * Places the items on the map according to the given layout
     * @param {} layout : disposition of the items on the map
     */
    #placeItems(layout) {

    }

    #getKeyPressed() {

    }

    /**
     * runs the update of all items which need one
     */
    #runUpdate() {
        this.#updatePlanned = false;

        // actual update

        let keyPressed = false;
        // get keyboard entry /!\ TO DO
        if (keyPressed) this.#nextUpdate.push(this.#playerLoc);

        for (const coord of this.#update) if (!(this.#grid[coord.y()][coord.x()] == null)) this.#grid[coord.y()][coord.x()].update();

        // to do after the update
        this.#update = this.#nextUpdate.map((x) => x);
        this.#nextUpdate = [];

        if (this.#updatePlanned) setTimeout(this.#runUpdate, refreshTime);
    }

    /**
     * way for the controller to trigger an update
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
        this.#grid[coordB.y][coordB.x] = null;
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
     * When the player dies
     */
    death() {

    }

}









/**
 * utiliser deux listes : nextUpdate et update
 * toutes les 0.1 secondes, nextUpdate devient update et ce nouvel update est appliqué, remplissant le nextUpdate le cas échéant
*/