


/**
 * if there is a saved game in localStorage, print the button #loadSavedGameB
 */
if(window.localStorage.getItem('backup') !== null && JSON.parse(window.localStorage.getItem('backup')) != null) {
    document.getElementById("loadSavedGameB").style.display = "block";
}


/**
 * set the localStorage variable 'loadSavedGame' to false in order to alert that the player wants to start a new game
 * after that launch the html game page
 */
function newGame() {
    if(window.localStorage.getItem('backup') !== null && JSON.parse(window.localStorage.getItem('backup')) != null) {
        let bool =confirm("Si vous démarrez une nouvelle partie, vous perdrez votre sauvegarde précédente.");
        if (bool == true) { 
            window.localStorage.setItem('loadSavedGame', 'false');
            window.location.href='html/game.html';
        }
    }
    else {
        window.localStorage.setItem('loadSavedGame', 'false');
        window.location.href='html/game.html';
    }
}

/**
 * set the localStorage variable 'loadSavedGame' to true in order to alert that the player wants to load the saved game
 * after that launch the html game page
 */
function loadSavedGame() {
    if(window.localStorage.getItem('backup') !== null && JSON.parse(window.localStorage.getItem('backup')) != null) 
    {
        window.localStorage.setItem('loadSavedGame', 'true');
        window.location.href='html/game.html';    
    }
    else { alert("Impossible de charger une partie... Commencez d'abord une nouvelle partie !"); }
}

// creates a soundPlayer for the music
let soundPlayer = 0;

/**
 * attach the newGame function to the button #newGameB
 */
document.getElementById("newGameB").addEventListener("click", newGame);

/**
 * attach the loadSavedGame function to the button #loadSavedGameB
 */
document.getElementById("loadSavedGameB").addEventListener("click", loadSavedGame);

/**
 * open the levels_management page when click on the button #levelsManagementB
 */
document.getElementById("levelsManagementB").addEventListener("click", () => { window.location.href='html/levels_management.html'; });

/**
 * attach the mute function of the soundPlayer to the button #volume
 */
document.getElementById("volume").addEventListener("click", () => { soundPlayer.mute(); });

/**
 * play or not the background music
 */
window.addEventListener("load", () => {
    import { SoundPlayer, m_home } from "../view/soundPlayer.js";
    soundPlayer = new SoundPlayer();
    soundPlayer.setMusic(m_home);
    soundPlayer.playOrNot();
});