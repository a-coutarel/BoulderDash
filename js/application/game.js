import { MapController } from "../controller/map_controller.js";
import { PlayableMaps } from "../model/playable_maps.js";
import { T, V, R, M, P, D } from "../model/map.js";

class Game {

    #controller;

    #loadSavedGame;

    constructor() {
        this.#controller = new MapController();
        this.#loadSavedGame = window.localStorage.getItem('loadSavedGame');
        if(this.#loadSavedGame == 'true') { this.#loadSaveGame(); }
        else { this.#createNewGame(); }
    }

    get controller() { return this.#controller; };

    #loadSaveGame() {
        this.#controller.loadGame(JSON.parse(window.localStorage.getItem('map')));
    }

    #createNewGame() {
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
        this.#controller.newGame("Very Basic Map", layout); 
        window.localStorage.setItem('loadSavedGame', 'true');
    }

    saveGameInWeb() {
        window.localStorage.setItem('map', JSON.stringify(this.controller.map.saveGame()));
    }

    volume() 
    {
        let audio = document.getElementById('audio');
        if(audio.duration > 0 && !audio.paused) { 
            audio.muted = !audio.muted;
            if(audio.muted == true) { window.sessionStorage.setItem('muted', 'true'); }
            else { window.sessionStorage.setItem('muted', 'false'); }
        }
        else { 
            audio.play();
            window.sessionStorage.setItem('muted', 'false');
        }
    }
    
    retry() {
        var r =confirm("Voulez-vous recommencer la partie ?");
        if (r == true) { 
            window.localStorage.setItem('loadSavedGame', 'false');
            location.reload();
        }
    }
    
    return_menu() {
        var r =confirm("Voulez-vous retourner à l'accueil ? Votre partie sera sauvegardée.");
        if (r == true) { window.location.href='../index.html'; }
    }

}



let game = null;

window.addEventListener("load", () => {
    document.getElementById('audio').volume = 0.2;
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
    game = new Game();
});

window.addEventListener('beforeunload', () => {
    game.saveGameInWeb();
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
