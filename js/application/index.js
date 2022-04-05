function volume() {
    let audio = document.getElementById('audio');
    if(audio.duration > 0 && !audio.paused) { audio.muted = !audio.muted; }
    else { audio.play(); }
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