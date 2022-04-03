import { Coordinates } from "./coordinates.js";
import { Generic_item, DIRT, ROCK, WALL, DIAMOND, unbreakable, ROCKFORD } from "./generic_item.js";
import { MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, NOMOVE} from "./map.js";

export class Rockford extends Generic_item {

    /**
     * Constructor
     * @param {Map} map : map on which is placed the item
     * @param {Coordinates} coordinates : coordinates of the item on the map
     */
    constructor(map, coordinates)
    {
        super(ROCKFORD, map, coordinates);
    }

    /**
     * Updates the item if one of its neighbors moved
     */
    update() {
        const order = this.map.nextMove;
        console.log(order);
        switch (order) {
            case MOVEUP:
                this.#moveUp();
                break;
            case MOVEDOWN:
                this.#moveDown();
                break;
            case MOVELEFT:
                this.#moveLeft();
                break;
            case MOVERIGHT:
                this.#moveRight();
                break;
        }

    }

    /**
     * Moves Rockford upward, if possible
     */
    #moveUp() {
        const coordUp = this.coordinates.up();

        if (!this.map.isOnMap(coordUp)) return;

        let upNeighbor = this.map.getItemType(coordUp);

        if (upNeighbor != null && unbreakable.includes(upNeighbor)) return;

        if (upNeighbor != null && upNeighbor == DIAMOND) {
            this.map.collectDiamond();
        }

        this.map.addNeighborsToUpdate(this.coordinates);
        this.map.moveItem(this.coordinates, coordUp);
        this.map.addMovement();
    }

    /**
     * Moves Rockford downward, if possible
     */
    #moveDown() {
        const coordDown = this.coordinates.down();

        if (!this.map.isOnMap(coordDown)) return;

        let downNeighbor = this.map.getItemType(coordDown);

        if (!(downNeighbor == null) && (unbreakable.includes(downNeighbor))) return;

        if (!(downNeighbor == null) && (downNeighbor == DIAMOND)) {
            this.map.collectDiamond();
        }

        this.map.addNeighborsToUpdate(this.coordinates);
        this.map.moveItem(this.coordinates, coordDown);
        this.map.addMovement();
    }

    /**
     * Moves Rockford rightward, if possible
     */
    #moveRight() {
        const coordRight = this.coordinates.right();

        if (!this.map.isOnMap(coordRight)) return;

        let rightNeighbor = this.map.getItemType(coordRight);

        if (!(rightNeighbor == null) && (rightNeighbor) == WALL) return;

        if (!(rightNeighbor == null) && (rightNeighbor) == ROCK) {
            if (this.map.getItemType(coordRight.right()) == null) {
                this.map.addNeighborsToUpdate(this.coordinates);
                this.map.addNeighborsToUpdate(coordRight);
                this.map.moveItem(coordRight, coordRight.right());
                this.map.moveItem(this.coordinates, coordRight);
                this.map.addMovement();
            }
            return;
        }

        if (!(rightNeighbor == null) && (rightNeighbor == DIAMOND)) {
            this.map.collectDiamond();
        }

        this.map.addNeighborsToUpdate(this.coordinates);
        this.map.moveItem(this.coordinates, coordRight);
        this.map.addMovement();
    }

    /** 
     * Moves Rockford leftward, if possible
     * */
    #moveLeft() {
        const coordLeft = this.coordinates.left();

        if (!this.map.isOnMap(coordLeft)) return;

        let leftNeighbor = this.map.getItemType(coordLeft);

        if (!(leftNeighbor == null) && (leftNeighbor) == WALL) return;

        if (!(leftNeighbor == null) && (leftNeighbor) == ROCK) {
            if (this.map.getItemType(coordLeft.left()) == null) {
                this.map.addNeighborsToUpdate(this.coordinates);
                this.map.addNeighborsToUpdate(coordLeft);
                this.map.moveItem(coordLeft, coordLeft.left());
                this.map.moveItem(this.coordinates, coordLeft);
                this.map.addMovement();
            }
            return
        }

        if (!(leftNeighbor == null) && (leftNeighbor == DIAMOND)) {
            this.map.collectDiamond();
        }

        this.map.addNeighborsToUpdate(this.coordinates);
        this.map.moveItem(this.coordinates, coordLeft);
        this.map.addMovement();
    }

}