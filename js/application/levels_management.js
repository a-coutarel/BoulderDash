import { PlayableMaps } from "../model/playable_maps.js";

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

function addMap() {
    let layout = [];
    let decomposed_line = [];
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function(progressEvent){
    let lines = this.result.split('\n');
    for(let line = 0; line < lines.length; line++){
        for(let i = 0; i < lines[line].length; i++){
            if(lines[line].charAt(i) != '\r')
                decomposed_line[i] = lines[line].charAt(i);
        }
        layout[line] = decomposed_line;
        decomposed_line = [];
    }
    };
    let name = this.files[0].name;
    reader.readAsText(file);
    console.log(layout.length)
    mapsList.addMap(name, layout);
}







let mapsList = new PlayableMaps();

window.addEventListener("load", () => {
    document.getElementById('audio').volume = 0.2;
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
    if((window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null) 
    && (window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null)) {
        mapsList.maps = JSON.parse(window.localStorage.getItem('mapsList'));
        mapsList.currentMapIndex = JSON.parse(window.localStorage.getItem('currentMapIndex'));
    }
});

window.addEventListener('beforeunload', () => {
    window.localStorage.setItem('mapsList', JSON.stringify(mapsList.maps));
    window.localStorage.setItem('currentMapIndex', JSON.stringify(mapsList.currentMapIndex));
});

document.querySelector("#loadLevelButton").addEventListener("click", () => {
    document.getElementById('file').click();
});
document.getElementById("file").addEventListener("change",addMap, false);

document.querySelector("#deleteLevelButton").addEventListener("click", () => {
    document.getElementById("deleteLevel").style.display = "flex";
    document.getElementById("buttons").style.display = "none";
});

document.querySelector("#deleteBack").addEventListener("click", () => {
    document.getElementById("deleteLevel").style.display = "none";
    document.getElementById("buttons").style.display = "flex";
});

document.querySelector("#modifyLevelsOrderButton").addEventListener("click", () => {
    document.getElementById("modifyLevelsOrder").style.display = "flex";
    document.getElementById("buttons").style.display = "none";
});

document.querySelector("#modifyBack").addEventListener("click", () => {
    document.getElementById("modifyLevelsOrder").style.display = "none";
    document.getElementById("buttons").style.display = "flex";
});

document.querySelector("#home").addEventListener("click", () => {
    window.location.href='../index.html';
});

document.querySelector("#volume").addEventListener("click", volume);