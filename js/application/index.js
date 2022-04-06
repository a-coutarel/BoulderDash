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
    window.localStorage.setItem('loadSavedGame', 'false');
    window.location.href='html/game.html';
}

function loadSavedGame() {
    if(window.localStorage.getItem('map') !== null && JSON.parse(window.localStorage.getItem('map')) != null) 
    {
        window.localStorage.setItem('loadSavedGame', 'true');
        window.location.href='html/game.html';    
    }
    else { alert("Impossible de charger une partie... Commencez d'abord une nouvelle partie !"); }
}

window.addEventListener("load", () => {
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
});