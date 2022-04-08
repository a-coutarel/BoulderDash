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

function loadSavedGame() {
    if(window.localStorage.getItem('backup') !== null && JSON.parse(window.localStorage.getItem('backup')) != null) 
    {
        window.localStorage.setItem('loadSavedGame', 'true');
        window.location.href='html/game.html';    
    }
    else { alert("Impossible de charger une partie... Commencez d'abord une nouvelle partie !"); }
}

window.addEventListener("load", () => {
    document.getElementById('audio').volume = 0.2;
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
});