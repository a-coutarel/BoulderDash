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
    let file = this.files[0];
    let reader = new FileReader();
    mapsList.addMap(file, reader);
}


function saveMapsList() {
    window.localStorage.setItem('mapsList', JSON.stringify(mapsList.maps));
    window.localStorage.setItem('currentMapIndex', JSON.stringify(mapsList.currentMapIndex));
}

let mapsList = new PlayableMaps();

window.addEventListener("load", () => {
    document.getElementById('audio').volume = 0.2;
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
    if((window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null)) {
        mapsList.maps = JSON.parse(window.localStorage.getItem('mapsList'));
        mapsList.currentMapIndex = JSON.parse(window.localStorage.getItem('currentMapIndex'));
    }
    else { 
        window.localStorage.setItem('mapsList', JSON.stringify(mapsList.maps));
        window.localStorage.setItem('currentMapIndex', JSON.stringify(mapsList.currentMapIndex)); 
    }
});

window.addEventListener('beforeunload', () => {
    saveMapsList();
});

document.querySelector("#loadLevelButton").addEventListener("click", () => {
    document.getElementById('file').click();
});
document.getElementById("file").addEventListener("change",addMap, false);

document.querySelector("#deleteLevelButton").addEventListener("click", () => {
    printDeleteMapDiv();
});

document.querySelector("#modifyLevelsOrderButton").addEventListener("click", () => {
    printModifyOrderDiv();
});

document.querySelector("#home").addEventListener("click", () => {
    window.location.href='../index.html';
});

document.querySelector("#volume").addEventListener("click", volume);


function printDeleteMapDiv() {
    const div = document.getElementById("deleteLevel");
    div.innerHTML = "";
    div.style.display = "flex";
    document.getElementById("buttons").style.display = "none";

    for(let i=0; i < mapsList.maps.length; i++) {

        let mapName = document.createElement("h1");
        mapName.innerText = mapsList.maps[i].name;

        let button = document.createElement("button");
        button.innerText = "Supprimer";
        button.id = i.toString();
        button.addEventListener("click", () => {
            let bool =confirm("Êtes-vous sûr de vouloir supprimer cette map ?");
            if (bool == true) { 
                mapsList.deleteMap(i);
                printDeleteMapDiv();
            }
        });
        div.appendChild(mapName);
        div.appendChild(button);
    }

    let backButton = document.createElement("button");
    backButton.innerText = "Retour";
    backButton.addEventListener("click", () => {
        document.getElementById("deleteLevel").style.display = "none";
        document.getElementById("buttons").style.display = "flex";
    });
    div.appendChild(backButton);
}


function printModifyOrderDiv() {

    const div = document.getElementById("modifyLevelsOrder");
    div.innerHTML = "";
    div.style.display = "flex";
    document.getElementById("buttons").style.display = "none";

    for(let i=0; i < mapsList.maps.length; i++) {

        let divMap = document.createElement("div");
        let divButton = document.createElement("div");

        let mapName = document.createElement("h1");
        mapName.innerText = (i+1).toString()+". "+mapsList.maps[i].name;

        let minusButton = document.createElement("button");
        minusButton.innerText = "↑";
        minusButton.id = i.toString()+"-minus";
        minusButton.addEventListener("click", () => {
            mapsList.changePosition(i, i-1);
            printModifyOrderDiv();
        });

        let plusButton = document.createElement("button");
        plusButton.innerText = "↓";
        plusButton.id = i.toString()+"-plus";
        plusButton.addEventListener("click", () => {
            mapsList.changePosition(i, i+1);
            printModifyOrderDiv();
        });

        divMap.appendChild(mapName);
        divButton.appendChild(minusButton);
        divButton.appendChild(plusButton);
        divMap.appendChild(divButton);
        div.appendChild(divMap).className = "divMap";
    }

    let backButton = document.createElement("button");
    backButton.innerText = "Retour";
    backButton.addEventListener("click", () => {
        document.getElementById("modifyLevelsOrder").style.display = "none";
        document.getElementById("buttons").style.display = "flex";
    });
    div.appendChild(backButton);
}