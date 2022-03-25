import { Coordinates } from "./coordinates.js";
import { Diamond } from "./diamond.js";
import { Dirt } from "./dirt.js";
import { Rock } from "./rock.js";
import { Rockford } from "./rockford.js";
import { Wall } from "./wall.js";


export class map {
    // grid used to place items
    #grid;

    /**
     * Constructor
     */
    constructor() {
        this.#grid = [];

        this.#generateGrid();
    }

    #generateGrid() {
        this.#grid = [];

        for (let y = 0; x < 16; ++y) {

            let line = [];

            for (let x = 0; x < 32; ++x) {
                line.push(null);
            }

            this.#grid.push(line);
        }
    }

    #placeItems() {

    }

}









/**
 * utiliser deux listes : nextUpdate et update
 * toutes les 0.1 secondes, nextUpdate devient update et ce nouvel update est appliqué, remplissant le nextUpdate le cas échéant
*/