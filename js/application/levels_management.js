import { PlayableMaps } from "../model/playable_maps.js";
import { T, V, R, M, P, D } from "../model/map.js";

class Levels_Management {

    #textures;

    #mapsList;

    constructor() {
        this.#mapsList = new PlayableMaps();
        this.#textures = {};
        this.#loadImages();
    }

    get mapsList () { return this.#mapsList; }

    #loadImages() {
        let imagesPath = [
            ["dirt",                "../img/textures/dirt.png"],
            ["background",          "../img/textures/background.png"],
            ["stone",               "../img/textures/stone.png"],
            ["bloody_stone",        "../img/textures/bloody_stone.png"],
            ["wall",                "../img/textures/wall.png"],
            ["is_that_rf",          "../img/textures/is_that...rockford.png"],
            ["rockford",            "../img/textures/rockford.gif"],
            ["to_the_left",         "../img/textures/to_the_left.gif"],
            ["to_the_right",        "../img/textures/to_the_right.gif"],
            ["diamond",             "../img/textures/diamond.gif"]
        ];
    
        for (let k = 0; k < imagesPath.length; ++k) {
            this.#textures[imagesPath[k][0]] = new Image();
            this.#textures[imagesPath[k][0]].src = imagesPath[k][1];
        }
    }

    volume() {
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

    saveMapsList() {
        window.localStorage.setItem('mapsList', JSON.stringify(this.#mapsList.maps));
        window.localStorage.setItem('currentMapIndex', JSON.stringify(this.#mapsList.currentMapIndex));
    }

    getMap(map, layout) {
        map.innerHTML = "";
        map.style.setProperty('--grid-rows', 16);
        map.style.setProperty('--grid-cols', 32);
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 32; j++) {
                let cell = document.createElement("div");
                switch (layout[i][j]) {
                    case T: cell.style.backgroundImage = "url(" + this.#textures.dirt.src + ")"; break;
                    case V: cell.style.backgroundImage = "url(" + this.#textures.background.src + ")"; break;
                    case R: cell.style.backgroundImage = "url(" + this.#textures.stone.src + ")"; break;
                    case M: cell.style.backgroundImage = "url(" + this.#textures.wall.src + ")"; break;
                    case P: cell.style.backgroundImage = "url(" + this.#textures.rockford.src + ")"; break;
                    case D: cell.style.backgroundImage = "url(" + this.#textures.diamond.src + ")"; break;
                }
                map.appendChild(cell).className = "grid-item";
            }
        }
    }

    printDeleteMapDiv() {
        const div = document.getElementById("deleteLevel");
        div.innerHTML = "";
        div.style.display = "flex";
        document.getElementById("buttons").style.display = "none";
        
        let title = document.createElement("h1");
        title.innerText = "Supprimer un niveau";
        div.appendChild(title).className = "title";
    
        for(let i=0; i < this.#mapsList.maps.length; i++) {
    
            let divMapDelete = document.createElement("div");
    
            let map = document.createElement("boulderdash");
            this.getMap(map, this.#mapsList.maps[i].layout);
    
            let mapName = document.createElement("h1");
            mapName.innerText = "---- Map " + (i+1).toString() + " : " + this.#mapsList.maps[i].name + " ----";
    
            let button = document.createElement("button");
            button.innerText = "Supprimer";
            button.id = i.toString();
            button.addEventListener("click", () => {
                let bool =confirm("Êtes-vous sûr de vouloir supprimer cette map ?");
                if (bool == true) { 
                    this.#mapsList.deleteMap(i);
                    this.printDeleteMapDiv();
                }
            });
            divMapDelete.appendChild(mapName);
            divMapDelete.appendChild(map);
            div.appendChild(divMapDelete).className = "divMapDelete";
            div.appendChild(button);
            div.appendChild(document.createElement("hr"));
        }
    
        let backButton = document.createElement("button");
        backButton.innerText = "Retour";
        backButton.addEventListener("click", () => {
            document.getElementById("deleteLevel").style.display = "none";
            document.getElementById("buttons").style.display = "flex";
        });
        div.appendChild(backButton);
    }

    printModifyOrderDiv() {

        const div = document.getElementById("modifyLevelsOrder");
        div.innerHTML = "";
        div.style.display = "flex";
        document.getElementById("buttons").style.display = "none";
    
        let title = document.createElement("h1");
        title.innerText = "Disposition des niveaux";
        div.appendChild(title).className = "title";
    
        for(let i=0; i < this.#mapsList.maps.length; i++) {
    
            let divLevel = document.createElement("div");
            let divButton = document.createElement("div");
            let divMap = document.createElement("div");
    
            let map = document.createElement("boulderdash");
            this.getMap(map, this.#mapsList.maps[i].layout);
    
            let mapName = document.createElement("h1");
            mapName.innerText = "---- Map " + (i+1).toString() + " : " + this.#mapsList.maps[i].name + " ----";
    
            let minusButton = document.createElement("button");
            minusButton.innerHTML = '<img class="arrowImg" src="../img/up_arrow.png" />';
            minusButton.className = "arrowBtn";
            minusButton.addEventListener("click", () => {
                this.#mapsList.changePosition(i, i-1);
                this.printModifyOrderDiv();
            });
    
            let plusButton = document.createElement("button");
            plusButton.innerHTML = '<img class="arrowImg" src="../img/down_arrow.png" />';
            plusButton.className = "arrowBtn";
            plusButton.addEventListener("click", () => {
                this.#mapsList.changePosition(i, i+1);
                this.printModifyOrderDiv();
            });
    
            divButton.appendChild(minusButton);
            divButton.appendChild(plusButton);
    
            divMap.appendChild(map);
            divMap.appendChild(divButton).className = "divButton";
            
            divLevel.appendChild(mapName);
            divLevel.appendChild(divMap).className = "divMap";
    
            div.appendChild(divLevel).className = "divLevel";
            div.appendChild(document.createElement("hr"));
        }
    
        let backButton = document.createElement("button");
        backButton.innerText = "Retour";
        backButton.addEventListener("click", () => {
            document.getElementById("modifyLevelsOrder").style.display = "none";
            document.getElementById("buttons").style.display = "flex";
        });
        div.appendChild(backButton);
    }
}


function addMap() {
    let file = this.files[0];
    let reader = new FileReader();
    levelsManagement.mapsList.addMap(file, reader);
}

let levelsManagement = null;

window.addEventListener("load", () => {
    levelsManagement = new Levels_Management();
    document.getElementById('audio').volume = 0.2;
    if(window.sessionStorage.getItem('muted') == 'true') { document.getElementById('audio').muted = true; }
    if((window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null)) {
        levelsManagement.mapsList.maps = JSON.parse(window.localStorage.getItem('mapsList'));
        levelsManagement.mapsList.currentMapIndex = JSON.parse(window.localStorage.getItem('currentMapIndex'));
    }
    else { 
        window.localStorage.setItem('mapsList', JSON.stringify(levelsManagement.mapsList.maps));
        window.localStorage.setItem('currentMapIndex', JSON.stringify(levelsManagement.mapsList.currentMapIndex)); 
    }
});

window.addEventListener('beforeunload', () => {
    levelsManagement.saveMapsList();
});

document.querySelector("#loadLevelButton").addEventListener("click", () => {
    document.getElementById('file').click();
});

document.getElementById("file").addEventListener("change", addMap, false);

document.querySelector("#deleteLevelButton").addEventListener("click", () => {
    levelsManagement.printDeleteMapDiv();
});

document.querySelector("#modifyLevelsOrderButton").addEventListener("click", () => {
    levelsManagement.printModifyOrderDiv();
});

document.querySelector("#home").addEventListener("click", () => {
    window.location.href='../index.html';
});

document.querySelector("#volume").addEventListener("click", () => {
    levelsManagement.volume();
});