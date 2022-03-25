import { Coordinates } from "./coordinates.js";
import { Generic_item, ROCK } from "./generic_item.js";

export class Rock extends Generic_item {

    /**
     * Constructor
     * @param {Map} map : map on which is placed the item
     * @param {Coordinates} coordinates : coordinates of the item on the map
     */
    constructor(map, coordinates) {
        super(ROCK, map, coordinates);
    }

    /**
     * Updates the item if one of its neighbors moved
     */
    update() {
        if (self.#falling) {

        }


        throw "This method must be completed!";
    }

}
