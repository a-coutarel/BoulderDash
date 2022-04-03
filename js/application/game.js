import { MapController } from "../controller/map_controller.js";
import { T, V, R, M, P, D } from "../model/map.js";

function volume() {
    let audio = document.getElementById('audio');
    if(audio.duration > 0 && !audio.paused) {
        audio.muted = !audio.muted;
    }
    else {
        audio.play();
    }
}

function retry(){
    var r =confirm("Voulez-vous recommencer la partie ?");
    if (r == true) {
        location.reload();
    }
}

function return_menu(){
    var r =confirm("Voulez-vous retourner à l'accueil ?");
    if (r == true) {
        window.location.href='../index.html';
    }
}

function printMap() {
    let T = 'T';
    let V = 'V';
    let R = 'R';
    let M = 'M';
    let P = 'P';
    let D = 'D';
    let tab = [
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
    ];
    const map = document.querySelector("boulderdash");
    map.innerHTML = "";
    map.style.setProperty('--grid-rows', 16);
    map.style.setProperty('--grid-cols', 32);
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 32; j++) {
            let cell = document.createElement("div");  
            switch (tab[i][j]) {
                case T: cell.style.backgroundImage = "url('../img/textures/dirt.png')"; break;
                case V: cell.style.backgroundImage = "url('../img/textures/background.png')"; break;
                case R: cell.style.backgroundImage = "url('../img/textures/stone.png')"; break;
                case M: cell.style.backgroundImage = "url('../img/textures/wall.png')"; break;
                case P: cell.style.backgroundImage = "url('../img/textures/rockford.png')"; break;
                case D: cell.style.backgroundImage = "url('../img/textures/diamond.png')"; break;
            }
            map.appendChild(cell).className = "grid-item";
        }
    }
    document.querySelector("#nb_diams_present").innerText = "8";
}

const layout = [
    [T, T, T, T, T, T, V, T, T, D, T, R, V, T, T, T, T, T, R, T, R, T, T, T, T, T, T, T, V, T, T, T],
    [T, R, P, R, T, T, T, T, T, T, V, T, T, T, T, T, T, T, T, T, R, D, T, T, R, T, T, T, T, V, T, T],
    [T, T, T, T, T, T, T, T, T, T, V, T, T, V, T, T, T, T, T, R, T, R, T, T, R, T, T, T, T, T, T, T],
    [R, T, V, V, T, T, T, T, T, T, T, T, T, R, T, T, T, T, T, T, R, T, T, R, T, T, T, T, R, T, T, T],
    [R, T, R, R, T, T, T, T, T, T, T, T, T, R, R, T, T, R, T, T, T, T, T, T, T, T, R, T, T, T, T, T],
    [T, T, T, R, T, T, R, T, T, T, T, T, T, T, T, R, T, T, T, T, T, R, T, V, R, T, T, T, T, T, T, T],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, T, T],
    [T, V, T, T, T, R, T, T, D, T, V, T, T, R, T, R, T, T, T, T, T, T, T, T, T, T, D, T, R, V, T, T],
    [T, T, D, T, T, T, T, T, R, T, T, T, T, T, V, T, T, T, T, T, T, T, T, R, V, V, R, T, T, D, T, T],
    [T, T, T, R, T, T, R, T, R, T, T, T, T, T, T, T, T, T, T, T, T, T, T, R, R, T, R, T, T, R, T, T],
    [T, V, T, T, T, T, T, R, T, T, T, T, T, T, T, T, R, R, V, T, T, T, T, T, T, T, R, T, T, R, T, D],
    [T, R, T, T, V, T, T, R, T, V, V, T, T, T, T, T, R, T, R, D, T, T, D, T, T, T, T, R, T, T, T, R],
    [T, D, R, T, T, T, T, T, T, T, T, T, T, T, T, T, T, R, R, R, T, T, R, T, T, T, T, T, T, T, T, D],
    [T, T, T, T, T, T, T, T, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M],
    [V, V, T, T, T, T, T, T, T, T, T, V, T, T, T, D, T, T, T, T, R, T, T, T, T, R, V, T, T, R, V, D],
    [R, V, T, T, T, T, T, T, T, T, T, R, R, T, T, R, T, T, T, T, T, T, T, T, R, T, T, T, T, T, R, T]
];


function launchGame() {
    let controller = new MapController();
    controller.newGame(layout);
}

window.addEventListener("load", () => {
    launchGame();
})
