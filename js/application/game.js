import { MapController } from "../controller/map_controller.js";
import { T, V, R, M, P, D } from "../model/map.js";

class Game {

    #controller;

    constructor(layout)
    {
        /*this.#controller = new MapController();
        this.#controller.newGame(layout);*/
        console.log(JSON.parse(window.localStorage.getItem('map')));
        if(JSON.parse(window.localStorage.getItem('map'))!=null) {
            this.#controller = new MapController();
            this.#controller.loadGame(JSON.parse(window.localStorage.getItem('map'))); 
        }
        else {
            this.#controller = new MapController();
            this.#controller.newGame(layout);  
        }
        
    }

    volume() {
        let audio = document.getElementById('audio');
        if(audio.duration > 0 && !audio.paused) {
            audio.muted = !audio.muted;
        }
        else {
            audio.play();
        }
    }
    
    retry(){
        var r =confirm("Voulez-vous recommencer la partie ?");
        if (r == true) {
            location.reload();
            window.localStorage.clear();
        }
    }
    
    return_menu(){
        window.localStorage.clear();
        window.localStorage.setItem('map', JSON.stringify(this.#controller.map.saveGame()));
        var r =confirm("Voulez-vous retourner à l'accueil ?");
        if (r == true) {
            window.location.href='../index.html';
        }
    }

}



const layout = [
    [T, T, T, T, T, T, V, T, T, D, T, R, V, T, T, T, T, T, R, T, R, T, T, T, T, T, T, T, V, T, T, T],
    [T, R, P, R, T, T, T, T, T, T, V, T, T, T, T, T, T, T, T, T, R, D, T, T, R, T, T, T, T, V, T, T],
    [T, T, T, T, T, T, T, T, T, T, V, T, T, V, T, T, T, T, T, R, T, R, T, T, R, T, T, T, T, T, T, T],
    [R, T, R, V, T, T, T, T, T, T, T, T, T, R, T, T, T, T, T, T, R, T, T, R, T, T, T, T, R, T, T, T],
    [R, T, V, R, T, T, T, T, T, T, T, T, T, R, R, T, T, R, T, T, T, T, T, T, T, T, R, T, T, T, T, T],
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

let game = null;

window.addEventListener("load", () => {
    game = new Game(layout);
});

document.querySelector("#retry").addEventListener("click", () => {
    game.retry();
});

document.querySelector("#volume").addEventListener("click", () => {
    game.volume();
});

document.querySelector("#home").addEventListener("click", () => {
    game.return_menu();
});