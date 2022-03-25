
export class Coordinates {
    // abscissa
    #x;

    // ordered
    #y;

    /**
     * Constructor
     * @param {Coordinates} coordinates : initial coordinates of the instance
     */
    constructor(coordinates) {
        this.#x = coordinates.x;
        this.#y = coordinates.y;
    }

    set x(value) { this.#x = value; }
    get x() { return this.#x; }

    set y(value) { this.#y = value; }
    get y() { return this.#y; }
}