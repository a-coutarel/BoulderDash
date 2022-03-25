import { Coordinates } from "./coordinates.js";

export const DIRT = "dirt";
export const ROCK = "rock";
export const DIAMOND = "diamond";
export const WALL = "wall";

export const ROCKFORD = "rockford";

export class Generic_item {
    // item type
    #type;

    // map on wich is placed the item
    #map;

    // coordinates of the item on the map
    #coordinates;

    // is the item falling ?
    #falling = false;

    /**
     * Constructor
     * @param {string} type : item type (DIRT, ROCK, DIAMOND, WALL, ROCKFORD)
     * @param {Map} map : map on which is placed the item
     * @param {Coordinates} coordinates : coordinates of the item on the map
     */
    constructor(type, map, coordinates) {
        this.#type = type;
        this.#map = map;
        this.#coordinates = new Coordinates(coordinates);
    }

    set coordinates(value) { this.#coordinates.x = value.x; this.#coordinates.y = value.y; }
    get coordinates() { return this.#coordinates; }

    get type() { return this.#type; }

    get map() { return this.#map; }

    /**
     * /!\ Abstract method - Must be redefined /!\
     * Updates the item if one of its neighbors moved
     */
    update() {
        throw "This method must be redefined!";
    }

}
