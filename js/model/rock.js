import { Coordinates } from "./coordinates.js";
import { Generic_item, ROCK, ROCKFORD } from "./generic_item.js";

export class Rock extends Generic_item {

    // is the item falling ?
    #falling = false;

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
        const coordDown = this.coordinates.down();

        if (!this.map.isOnMap(coordDown)) {
            this.#falling = false;
            return;
        }

        const downNeighbor = this.map.getItemType(coordDown);

        if (downNeighbor == null) {
            this.#falling = true;
            this.map.moveItem(this.coordinates, coordDown);
            this.map.addNeighborsToUpdate(this.coordinates);
            return
        }

        if (downNeighbor == ROCKFORD && this.#falling) {
            this.map.moveItem(this.coordinates, coordDown);
            this.map.addNeighborsToUpdate(this.coordinates);
            this.map.death();
            return
        }

        this.#falling = false;

    }

}
