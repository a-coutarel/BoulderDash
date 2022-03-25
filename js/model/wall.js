import { Coordinates } from "./coordinates.js";
import { Generic_item, WALL } from "./generic_item.js";

export class Wall extends Generic_item {

    /**
     * Constructor
     * @param {Map} map : map on which is placed the item
     * @param {Coordinates} coordinates : coordinates of the item on the map
     */
    constructor(map, coordinates)
    {
        super(WALL, map, coordinates);
    }

    /**
     * Updates the item if one of its neighbors moved
     */
    update() {
        /** Does nothing */
    }

}