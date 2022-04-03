import { Map } from "../model/map.js";
import { MapView } from "../view/map_view.js";


export class MapController {
    // map of the current game
    #map;

    // view showing game to the player
    #view;

    /**
     * Constructor
     * */
    constructor() {
        this.#view = new MapView(this);
        this.#map = new Map(this);
    }

    get map() { return this.#map; };

    /**
     * Launch a new game with the given layout
     * @param {Array} layout representing the initial disposition of the items
     */
    newGame(layout) {
        let data = {};

        data.gameOver = false;

        data.cDiamond = 0;
        data.moveCount = 0;

        data.layout = layout;

        this.#map.loadGame(data);
    }

    /**
     * Load a game according to the given set of data
     * @param {any} data representing the initial disposition of the items and the saved game variables
     */
    loadGame(data) {
        this.#map.loadGame(data);
    }

    /**
     * Notifies the view of an update and gives it the current layout
     * @param {Dictionnay} data current data of the game
     */
    notify(data) {
        this.#view.update(data);
    }





}


