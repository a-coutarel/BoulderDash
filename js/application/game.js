import { PlayableMaps } from "../model/playable_maps.js";
import { MapController } from "../controller/map_controller.js";
import { game_music, mute, playOrNot } from "../view/soundPlayer.js";

export class Game {
    // instance of MapController object
    #controller;
    
    // attribute which permite to know if the controller must start a new game or a saved game
    #loadSavedGame;

    // attribute which permite to know if there is a list of available maps in the game in the localStorage
    #loadMapsList;

    /**
     * Constructor
     */
    constructor() {
        window.sessionStorage.setItem('win', 'false');
        this.#loadMapsList = (window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null);
        this.#loadSavedGame = window.localStorage.getItem('loadSavedGame');
        this.#controller = new MapController();  
        this.#makeGame();
    }

    /**
     * initiate the list of avalaible maps in the game from the localStorage data if there is
     * if #loadSavedGame is equals to "true", load the saved game
     * if #loadSavedGame is equals to "false", load a new game
     */
    #makeGame() {
        if(this.#loadMapsList) { 
            this.#controller.mapsList.maps = JSON.parse(window.localStorage.getItem('mapsList'));
        }
        if(this.#loadSavedGame == 'true') { 
            this.#controller.mapsList.currentMapIndex = JSON.parse(window.localStorage.getItem('currentMapIndex'));
            this.#controller.loadGame(JSON.parse(window.localStorage.getItem('backup'))); 
        } else { 
            this.#controller.newGame(); 
            window.localStorage.setItem('loadSavedGame', 'true');
        }
    }

    /**
     * save in localStorage the current map data, the list of maps and the index of the map currently played in this list 
     * if the game is won, set loadSavedGame to false (if the page is close and re-open, or reload, permite to start a new game automatically )
     */
    saveGameInWeb() {
        if(window.sessionStorage.getItem('win') == 'true') { 
            this.#controller.mapsList.currentMapIndex = 0;
            window.localStorage.setItem('currentMapIndex', JSON.stringify(this.#controller.mapsList.currentMapIndex));
            window.localStorage.setItem('mapsList', JSON.stringify(this.#controller.mapsList.maps));
            window.localStorage.setItem('loadSavedGame', 'false');
            window.localStorage.removeItem('backup');
            return; 
        }
        window.localStorage.setItem('backup', JSON.stringify(this.#controller.map.saveGame()));
        window.localStorage.setItem('mapsList', JSON.stringify(this.#controller.mapsList.maps));
        window.localStorage.setItem('currentMapIndex', JSON.stringify(this.#controller.mapsList.currentMapIndex));
    }
    
    /**
     * reload the current level to try again
     */
    retry() {
        let bool =confirm("Voulez-vous recommencer la partie ?");
        if (bool == true) { this.#controller.retryLevel(); }
    }
}




/**
 * return to the index page
 */
function return_menu() {
    let bool =confirm("Voulez-vous retourner à l'accueil ? Votre partie sera sauvegardée.");
    if (bool == true) { window.location.href='../index.html'; }
}




/**
 * attach the mute function to the button #volume
 */
 document.querySelector("#volume").addEventListener("click", () => { mute(game_music) });

 /**
  * attach the return_menu function to the button #home
  */
 document.querySelector("#home").addEventListener("click", return_menu);

/**
 * when the page is completely loaded
 */
window.addEventListener("load", () => {

    playOrNot(game_music);
    
    // declaration of an instance of Game, start of the game
    const game = new Game();

    /**
     * attach the saveGameInWeb function of Game class called by the variable game to the event beforeunload
     */
    window.addEventListener('beforeunload', () => { game.saveGameInWeb(); });

    /**
     * attach the retry function of Game class called by the variable game to the button #retry
     */
    document.querySelector("#retry").addEventListener("click", () => { game.retry(); });
    
});