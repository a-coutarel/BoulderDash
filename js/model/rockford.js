import { Coordinates } from "./coordinates.js";
import { Generic_item, DIRT, ROCK, WALL, DIAMOND, unbreakable, ROCKFORD } from "./generic_item.js";
import { MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, NOMOVE} from "./map.js";

export class Rockford extends Generic_item {
    // is Rockford pushing right
    #pushingR;
    // is Rockford pushing left
    #pushingL;

    /**
     * Constructor
     * @param {Map} map : map on which is placed the item
     * @param {Coordinates} coordinates : coordinates of the item on the map
     */
    constructor(map, coordinates)
    {
        super(ROCKFORD, map, coordinates);

        this.#pushingL = false;
        this.#pushingR = false;
    }

    /**
     * Updates the item if one of its neighbors moved
     */
    update() {
        const order = this.map.nextMove;

        switch (order) {
            case MOVEUP:
                this.#moveUp();
                this.#pushingL = false;
                this.#pushingR = false;
                break;
            case MOVEDOWN:
                this.#moveDown();
                this.#pushingL = false;
                this.#pushingR = false;
                break;
            case MOVELEFT:
                this.#moveLeft();
                this.#pushingR = false;
                break;
            case MOVERIGHT:
                this.#moveRight();
                this.#pushingL = false;
                break;
            case NOMOVE:
                this.#pushingL = false;
                this.#pushingR = false;
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
            let rightOfRight = coordRight.right();
            if (!this.map.isOnMap(rightOfRight)) return;

            if (!this.#pushingR) {
                this.#pushingR = true;
                return;
            }

            if (this.map.getItemType(rightOfRight) == null) {
                this.#pushingR = false;
                this.map.addNeighborsToUpdate(this.coordinates);
                this.map.addNeighborsToUpdate(coordRight);
                this.map.moveItem(coordRight, rightOfRight);
                this.map.moveItem(this.coordinates, coordRight);
                this.map.addMovement();
            }

            

            return;
        }


        this.#pushingR = false;

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
            let leftOfLeft = coordLeft.left();
            if (!this.map.isOnMap(leftOfLeft)) return;

            if (!this.#pushingL) {
                this.#pushingL = true;
                return;
            }

            if (this.map.getItemType(leftOfLeft) == null) {
                this.#pushingL = false;
                this.map.addNeighborsToUpdate(this.coordinates);
                this.map.addNeighborsToUpdate(coordLeft);
                this.map.moveItem(coordLeft, leftOfLeft);
                this.map.moveItem(this.coordinates, coordLeft);
                this.map.addMovement();
            }
            return
        }

        this.#pushingL = false;

        if (!(leftNeighbor == null) && (leftNeighbor == DIAMOND)) {
            this.map.collectDiamond();
        }

        this.map.addNeighborsToUpdate(this.coordinates);
        this.map.moveItem(this.coordinates, coordLeft);
        this.map.addMovement();
    }

}