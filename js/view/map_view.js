import { MapController } from "../controller/map_controller.js";
import { T, V, R, RP, BR, BRP, M, DP, P, PL, PR, D } from "../model/map.js";

export class MapView {
    // controller of the map
    #controller;

    // dictonnary of images
    #images;

    /**
     * Constructor
     * @param {any} controller
     */
    constructor(controller) {
        this.#controller = controller;

        
        this.#images = {};

        this.#loadImages();
    }

    /**
     * Preloads the textures used in game
     * */
    #loadImages() {

        let imagesPath = [
            ["dirt",                "../img/textures/dirt.png"],
            ["background",          "../img/textures/background.png"],
            ["stone",               "../img/textures/stone.png"],
            ["bloody_stone",        "../img/textures/bloody_stone.png"],
            ["wall",                "../img/textures/wall.png"],
            ["is_that_rf",          "../img/textures/is_that...rockford.png"],
            ["rockford",            "../img/textures/rockford.gif"],
            ["to_the_left",         "../img/textures/to_the_left.gif"],
            ["to_the_right",        "../img/textures/to_the_right.gif"],
            ["diamond",             "../img/textures/diamond.gif"]
        ];

        for (let k = 0; k < imagesPath.length; ++k) {
            this.#images[imagesPath[k][0]] = new Image();
            this.#images[imagesPath[k][0]].src = imagesPath[k][1];
        }
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
                    case T: cell.style.backgroundImage = "url(" + this.#images.dirt.src + ")"; break;
                    case V: cell.style.backgroundImage = "url(" + this.#images.background.src + ")"; break;
                    case RP:
                    case R: cell.style.backgroundImage = "url(" + this.#images.stone.src + ")"; break;
                    case BRP:
                    case BR: cell.style.backgroundImage = "url(" + this.#images.bloody_stone.src + ")"; break;
                    case M: cell.style.backgroundImage = "url(" + this.#images.wall.src + ")"; break;
                    case DP: cell.style.backgroundImage = "url(" + this.#images.is_that_rf.src + ")"; break;
                    case P: cell.style.backgroundImage = "url(" + this.#images.rockford.src + ")"; break;
                    case PL: cell.style.backgroundImage = "url(" + this.#images.to_the_left.src + ")"; break;
                    case PR: cell.style.backgroundImage = "url(" + this.#images.to_the_right.src + ")"; break;
                    case D: cell.style.backgroundImage = "url(" + this.#images.diamond.src + ")"; break;
                }
                map.appendChild(cell).className = "grid-item";
            }
        }
        document.querySelector("#nb_diams_present").innerText = "Nombre de diamants présents : " + data.rDiamond;
        document.querySelector("#nb_diams_collected").innerText = "Nombre de diamants collectés : " + data.cDiamond;
        document.querySelector("#nb_deplacements").innerText = "Nombre de déplacements : " + data.moveCount;
    }

    /**
     * print the name of the map
     * @param {name} name of the map
     */
    updateName(name) {
        document.querySelector("mapName").innerText = name;
    }

    /**
     * print game over
     */
    lose() {
        document.querySelector("mapName").innerText = "Game Over";
    }

    /**
     * remove the map view and print a message to alert of the victory
     */
    win() {
        document.querySelector("boulderdash").style.display = "none";
        document.querySelector("#retry").style.display = "none";
        document.querySelector("mapName").innerText = "Partie Terminée";
    }

}