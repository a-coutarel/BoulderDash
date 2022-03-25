import { Coordinates } from "./coordinates.js";
import { Generic_item, DIAMOND } from "./generic_item.js";

export class Diamond extends Generic_item {

    /**
     * Constructor
     * @param {Map} map : map on which is placed the item
     * @param {Coordinates} coordinates : coordinates of the item on the map
     */
    constructor(map, coordinates)
    {
        super(DIAMOND, map, coordinates);
    }

    /**
     * Updates the item if one of its neighbors moved
     */
    update() {
        /** Does nothing */
    }

}