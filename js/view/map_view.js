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










































/*

let inputElement = document.getElementById("file");
inputElement.addEventListener("change", getLayout, false);

function getLayout() {
    let layout = [];
    let decomposed_line = [];
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function(progressEvent){
    let lines = this.result.split('\n');
    for(let line = 0; line < lines.length; line++){
        for(let i = 0; i < lines[line].length; i++){
            if(lines[line].charAt(i) != '\r')
                decomposed_line[i] = lines[line].charAt(i);
        }
        layout[line] = decomposed_line;
        decomposed_line = [];
    }
  };
  reader.readAsText(file);
  return layout;
}


[T,T,T,T,T,T,V,T,T,D,T,R,V,T,T,T,T,T,R,T,R,T,T,T,T,T,T,T,V,T,T,T],
[T,R,P,R,T,T,T,T,T,T,V,T,T,T,T,T,T,T,T,T,R,D,T,T,R,T,T,T,T,V,T,T],
[T,T,T,T,T,T,T,T,T,T,V,T,T,V,T,T,T,T,T,R,T,R,T,T,R,T,T,T,T,T,T,T],
[R,T,V,V,T,T,T,T,T,T,T,T,T,R,T,T,T,T,T,T,R,T,T,R,T,T,T,T,R,T,T,T],
[R,T,R,R,T,T,T,T,T,T,T,T,T,R,R,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T],
[T,T,T,R,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,R,T,V,R,T,T,T,T,T,T,T],
[M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,T,T],
[T,V,T,T,T,R,T,T,D,T,V,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,D,T,R,V,T,T],
[T,T,D,T,T,T,T,T,R,T,T,T,T,T,V,T,T,T,T,T,T,T,T,R,V,V,R,T,T,D,T,T],
[T,T,T,R,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,R,R,T,R,T,T,R,T,T],
[T,V,T,T,T,T,T,R,T,T,T,T,T,T,T,T,R,R,V,T,T,T,T,T,T,T,R,T,T,R,T,D],
[T,R,T,T,V,T,T,R,T,V,V,T,T,T,T,T,R,T,R,D,T,T,D,T,T,T,T,R,T,T,T,R],
[T,D,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,R,R,R,T,T,R,T,T,T,T,T,T,T,T,D],
[T,T,T,T,T,T,T,T,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M],
[V,V,T,T,T,T,T,T,T,T,T,V,T,T,T,D,T,T,T,T,R,T,T,T,T,R,V,T,T,R,V,D],
[R,V,T,T,T,T,T,T,T,T,T,R,R,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,R,T]





[V,T,V,R,T,T,V,T,V,T,T,V,T,T,V,T,T,R,T,V,T,T,P,V,T,T,V,T,V,V,T,T],
[T,R,T,R,V,T,T,T,T,T,T,V,T,T,R,T,T,T,V,T,T,T,T,R,T,T,T,R,T,T,T,T],
[V,R,T,T,R,T,T,T,V,V,T,T,T,R,T,T,R,T,R,T,T,R,T,R,T,T,T,M,M,M,M,M],
[T,T,T,D,R,T,T,R,T,V,V,T,T,T,T,T,R,T,T,T,T,T,V,T,T,T,T,T,T,T,T,R],
[M,M,M,M,M,M,M,M,M,M,M,M,T,T,R,T,R,T,T,T,T,V,T,V,V,T,T,T,T,T,T,R],
[T,V,V,T,T,T,V,T,T,V,T,V,V,T,T,V,T,V,V,T,T,T,T,V,R,R,V,T,T,T,T,T],
[T,T,T,V,V,T,T,T,V,V,V,T,V,T,T,V,T,V,V,T,T,T,T,T,R,T,V,R,T,T,V,T],
[T,T,R,T,R,T,T,R,V,V,V,T,T,T,T,R,T,T,T,T,T,D,T,T,T,V,R,R,T,T,R,T],
[T,T,T,T,T,R,V,T,D,R,V,T,T,V,T,R,D,V,R,V,T,V,T,T,T,R,R,R,T,T,R,T],
[R,T,R,T,T,T,V,T,R,T,V,T,T,T,T,T,V,T,T,R,T,T,T,V,T,T,T,T,R,T,D,R],
[T,T,T,T,T,T,R,T,R,V,T,T,T,T,T,T,R,R,T,T,R,T,T,T,M,M,M,M,M,M,M,M],
[T,R,R,T,T,T,T,T,T,R,T,T,R,T,V,T,T,T,V,T,R,V,T,R,T,T,R,T,V,V,T,T],
[M,M,M,M,M,M,M,M,M,M,M,M,R,T,T,T,T,T,T,T,R,T,T,T,T,T,T,V,T,T,T,T],
[T,T,V,T,T,T,V,V,T,T,T,D,T,T,R,T,V,T,T,R,T,R,R,R,T,T,T,T,T,T,T,T],
[T,T,R,T,T,R,T,V,T,V,T,T,T,M,M,M,M,M,M,M,M,T,T,D,R,T,T,T,R,R,R,T],
[V,T,T,V,V,T,T,T,T,R,T,T,R,V,R,T,T,T,D,V,T,T,R,T,T,T,T,T,T,T,T,T]





[T,D,T,M,R,T,T,T,T,T,R,T,T,T,M,T,T,T,T,R,T,T,R,M,R,T,T,T,M,T,R,D],
[R,M,T,M,T,T,T,R,T,R,T,T,R,T,T,T,T,R,T,M,T,T,M,M,M,T,T,T,M,T,R,T],
[M,M,T,M,T,T,P,T,T,T,T,R,M,M,T,R,T,T,T,T,T,M,T,T,T,T,R,T,T,D,R,V],
[R,T,T,T,T,T,T,R,R,T,R,T,T,T,T,T,T,R,T,T,T,M,T,T,T,T,R,T,T,R,M,R],
[M,T,T,T,T,T,T,R,R,T,R,T,T,T,T,T,T,T,D,M,M,T,R,T,T,M,M,T,R,T,T,M],
[T,T,M,M,D,T,T,R,T,T,T,T,T,T,R,R,T,R,T,T,T,T,T,T,R,T,T,T,M,T,T,T],
[R,T,M,T,R,T,T,M,T,T,T,T,T,T,R,R,T,R,T,T,T,T,M,T,T,T,R,R,T,R,T,T],
[R,T,D,T,T,R,M,T,T,R,M,T,M,T,R,T,T,R,M,M,T,T,R,T,D,T,T,T,T,T,T,D],
[M,T,R,T,T,M,T,T,T,M,T,D,T,T,R,T,T,R,M,M,T,T,R,T,D,R,T,M,M,T,M,T],
[M,T,R,T,D,T,T,R,M,T,T,T,R,M,T,T,R,M,D,M,T,D,T,T,R,M,R,R,T,T,T,T],
[M,M,T,R,T,T,M,M,T,T,T,T,R,M,T,T,R,M,R,M,T,R,T,T,R,M,M,T,T,T,M,T],
[M,M,T,R,T,M,M,T,T,T,T,T,R,T,T,T,M,T,T,T,T,R,T,T,R,M,M,T,T,T,M,T],
[T,T,T,M,T,T,T,T,R,R,T,R,T,T,R,T,T,T,T,R,M,T,T,R,M,T,M,T,D,T,M,T],
[D,T,M,M,T,M,T,T,T,T,T,T,M,R,T,M,T,T,T,D,T,T,T,M,T,T,T,T,R,T,T,R],
[T,T,M,T,T,T,T,T,T,R,M,T,R,T,T,T,R,T,R,T,T,R,M,T,T,T,D,T,M,T,T,R],
[T,T,T,T,T,T,T,T,T,R,M,T,R,T,T,R,T,R,T,T,R,M,M,T,R,T,T,M,M,T,R,T]


*/