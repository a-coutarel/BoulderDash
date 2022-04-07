import { Map, MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, NOMOVE } from "../model/map.js";
import { MapView } from "../view/map_view.js";


export class MapController {
    // map of the current game
    #map;

    // view showing game to the player
    #view;

    // list key currently down
    #keyDownList;

    /**
     * Constructor
     * */
    constructor() {
        this.#view = new MapView(this);
        this.#map = new Map(this);
        document.controller = this;
        
        this.#keyDownList = [];

        this.#setupKeyListening();
    }

    get map() { return this.#map; };

    get keyDownList() { return this.#keyDownList; };

    set keyDownList(value) { this.#keyDownList = value; };

    /**
     * Launch a new game with the given layout
     * @param {Array} layout representing the initial disposition of the items
     */
    newGame(layout) {
        let data = {};

        data.gameOver = false;
        data.playerDead = false;

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

    chooseOrder() {
        let map = this.map;
        const lastKey = this.keyDownList[this.keyDownList.length - 1];

        switch (lastKey) {
            case 38:
            case 90:
                map.playerOrder(MOVEUP);
                break;
            case 40:
            case 83:
                map.playerOrder(MOVEDOWN);
                break;
            case 37:
            case 81:
                map.playerOrder(MOVELEFT);
                break;
            case 39:
            case 68:
                map.playerOrder(MOVERIGHT);
                break;
            default:
                map.playerOrder(NOMOVE);
                break;
        }
    }

    #setupKeyListening() {
        document.addEventListener('keydown', function (event) {
            let controller = this.controller;

            controller.keyDownList.push(event.keyCode);

            controller.chooseOrder();
        });
        document.addEventListener('keyup', function (event) {
            let controller = this.controller;

            controller.keyDownList = controller.keyDownList.filter(function (value, index, arr) {
                return value != event.keyCode;
            });

            controller.chooseOrder();
        });
    }

}