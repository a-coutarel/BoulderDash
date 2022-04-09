/**
 * set the volume of the background music
 */
function volume() 
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




/**
 * if there is a saved game in localStorage, print the button #loadSavedGameB
 * and set the volume of the background music
 */
window.addEventListener("load", () => {
    if(window.localStorage.getItem('backup') !== null && JSON.parse(window.localStorage.getItem('backup')) != null) {
        document.getElementById("loadSavedGameB").style.display = "block";
    }
    document.getElementById('audio').volume = 0.2;
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
});

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
document.getElementById("levelsManagementB").addEventListener("click", () => {
    window.location.href='html/levels_management.html';
});

/**
 * attach the volume function to the button #volume
 */
document.getElementById("volume").addEventListener("click", volume);