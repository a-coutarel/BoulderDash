import { MapController } from "../controller/map_controller.js";
import { T, V, R, BR, M, DP, P, D } from "../model/map.js";

export class MapView {
    // controller of the map
    #controller;

    /**
     * Constructor
     * @param {any} controller
     */
    constructor(controller) {
        this.#controller = controller;
    }

    /**
     * Update the view
     * @param {any} data
     */
    update(data) {
        let layout = data.layout;
        const map = document.querySelector("boulderdash");
        map.innerHTML = "";
        map.style.setProperty('--grid-rows', 16);
        map.style.setProperty('--grid-cols', 32);
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 32; j++) {
                let cell = document.createElement("div");
                switch (layout[i][j]) {
                    case T: cell.style.backgroundImage = "url('../img/textures/dirt.png')"; break;
                    case V: cell.style.backgroundImage = "url('../img/textures/background.png')"; break;
                    case R: cell.style.backgroundImage = "url('../img/textures/stone.png')"; break;
                    case BR: cell.style.backgroundImage = "url('../img/textures/bloody_stone.png')"; break;
                    case M: cell.style.backgroundImage = "url('../img/textures/wall.png')"; break;
                    case DP: cell.style.backgroundImage = "url('../img/textures/is_that...rockford.png')"; break;
                    case P: cell.style.backgroundImage = "url('../img/textures/rockford.gif')"; break;
                    case D: cell.style.backgroundImage = "url('../img/textures/diamond.gif')"; break;
                }
                map.appendChild(cell).className = "grid-item";
            }
        }
        document.querySelector("#nb_diams_present").innerText = data.rDiamond;
        document.querySelector("#nb_diams_collected").innerText = data.cDiamond;
        document.querySelector("#nb_deplacements").innerText = data.moveCount;
    }




}