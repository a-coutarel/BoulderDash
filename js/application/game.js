import { MapController } from "../controller/map_controller.js";
import { PlayableMaps } from "../model/playable_maps.js";

class Game {

    #controller;

    #loadSavedGame;

    #loadMapsList;

    constructor() {
        this.#loadMapsList = (window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null);
        this.#loadSavedGame = window.localStorage.getItem('loadSavedGame');
        this.#controller = new MapController();  
        this.#makeGame();
    }

    #makeGame() {
        if(this.#loadMapsList) { 
            this.#controller.mapsList.maps = JSON.parse(window.localStorage.getItem('mapsList'));
        }
        if(this.#loadSavedGame == 'true') { 
            this.#controller.loadGame(JSON.parse(window.localStorage.getItem('backup'))); 
            this.#controller.mapsList.currentMapIndex = JSON.parse(window.localStorage.getItem('currentMapIndex'));
        } else { 
            this.#controller.newGame(); 
            window.localStorage.setItem('loadSavedGame', 'true');
        }
    }

    saveGameInWeb() {
        window.localStorage.setItem('backup', JSON.stringify(this.#controller.map.saveGame()));
        window.localStorage.setItem('mapsList', JSON.stringify(this.#controller.mapsList.maps));
        window.localStorage.setItem('currentMapIndex', JSON.stringify(this.#controller.mapsList.currentMapIndex));
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
        let bool =confirm("Voulez-vous recommencer la partie ?");
        if (bool == true) { this.#controller.retryLevel(); }
    }
    
    return_menu() {
        let bool =confirm("Voulez-vous retourner à l'accueil ? Votre partie sera sauvegardée.");
        if (bool == true) { window.location.href='../index.html'; }
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
