import { Map, MOVEUP, MOVEDOWN, MOVELEFT, MOVERIGHT, NOMOVE } from "../model/map.js";
import { MapView } from "../view/map_view.js";
import { PlayableMaps } from "../model/playable_maps.js";


export class MapController {
    // list of maps available in the game
    #mapsList
    
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
        this.#mapsList = new PlayableMaps();
        this.#view = new MapView(this);
        this.#map = new Map(this);
        document.controller = this;
        
        this.#keyDownList = [];

        this.#setupKeyListening();
    }

    get map() { return this.#map; };

    get keyDownList() { return this.#keyDownList; };

    set keyDownList(value) { this.#keyDownList = value; };

    get mapsList() {return this.#mapsList};

    /**
     * Launch a new game with the first map in the list of maps
     */
    newGame() {
        let data = {};

        data.gameOver = false;
        data.playerDead = false;

        data.cDiamond = 0;
        data.moveCount = 0;
        data.name = this.#mapsList.maps[0].name;
        data.layout = this.#mapsList.maps[0].layout;

        this.#map.loadGame(data);
    }

    /**
     * Launch the current level to try again
     * @param {Array} layout representing the initial disposition of the items
     */
     retryGame() {
        let data = this.#map.resetMap();
        data.name = this.#mapsList.getCurrentMapName();
        data.layout = this.#mapsList.getCurrentMapLayout();
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
        if(data.gameOver) { this.gameOver(); }
    }

    gameOver() {
        this.#view.lose();
        setTimeout(() => {this.retryGame()}, 2500);
    }

    nextLevel() {
        let nextMapData = this.#mapsList.nextMap();
        if(nextMapData.win) { 
            setTimeout(() => { this.#view.win(); }, 1500);
        }
        else {
            setTimeout(() => {
                let data = this.#map.resetMap();
                data.name = nextMapData.name;
                data.layout = nextMapData.layout;
                this.#map.loadGame(data);
            }, 1500);
        }
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