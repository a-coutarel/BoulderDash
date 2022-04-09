import { PlayableMaps } from "../model/playable_maps.js";
import { T, V, R, M, P, D } from "../model/map.js";
import { levels_management_music, mute, playOrNot } from "../view/soundPlayer.js";

export class LevelsManagement {
    // dictonnary of images
    #textures;

    // instance of PlayableMaps Object : list of available maps in the game 
    #mapsList;

    /**
     * Constructor
     */
    constructor() {
        this.#mapsList = new PlayableMaps();

        if((window.localStorage.getItem('mapsList') !== null || window.localStorage.getItem('mapsList') != null)) {
            this.#mapsList.maps = JSON.parse(window.localStorage.getItem('mapsList'));
            this.#mapsList.currentMapIndex = JSON.parse(window.localStorage.getItem('currentMapIndex'));
        }

        this.#textures = {};
        this.#loadImages();
    }

    /**
     * getter of the attribute #mapsList
     */
    get mapsList () { return this.#mapsList; }

    /**
     * Preloads the textures used to print maps
     * */
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

    /**
     * add the map representation in the div
     * @param {div} map : div in which the map will be printed
     * @param {[[any]]} layout : grid of map elements
     */
    #getMap(map, layout) {
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

    /**
     * save in localStorage the list of maps and the index of the map currently played
     */
    saveMapsList() {
        window.localStorage.setItem('mapsList', JSON.stringify(this.#mapsList.maps));
        window.localStorage.setItem('currentMapIndex', JSON.stringify(this.#mapsList.currentMapIndex));
    }

    /**
     * add the map file loaded to the list of available maps
     */
    addMap() {
        let file = document.getElementById("file").files[0];
        let reader = new FileReader();
        this.#mapsList.addMap(file, reader);
    }

    /**
     * add the default maps missing in the list of avalaible maps
     */
    reloadDefaultMaps() {
        this.#mapsList.reloadDefaultMaps();
    }

    /**
     * print the menu to delete map
     */
    printDeleteMapDiv() {
        //print the div menu
        const div = document.getElementById("deleteLevel");
        div.innerHTML = "";
        div.style.display = "flex";
        document.getElementById("buttons").style.display = "none";
        
        //add a title for the menu
        let title = document.createElement("h1");
        title.innerText = "Supprimer un niveau";
        div.appendChild(title).className = "title";
    
        //for each map in the list of avalaible maps #mapsList.maps
        for(let i=0; i < this.#mapsList.maps.length; i++) {
    
            //create new div
            let divMapDelete = document.createElement("div");
    
            //create a div which print the map
            let map = document.createElement("boulderdash");
            this.#getMap(map, this.#mapsList.maps[i].layout);
    
            //get the map name
            let mapName = document.createElement("h1");
            mapName.innerText = "---- Map " + (i+1).toString() + " : " + this.#mapsList.maps[i].name + " ----";
    
            //create delete button with the appropriate eventListener 
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

            //imbricate elements and add them to the div menu 
            divMapDelete.appendChild(mapName);
            divMapDelete.appendChild(map);
            div.appendChild(divMapDelete).className = "divMapDelete";
            div.appendChild(button);
            div.appendChild(document.createElement("hr"));
        }
    
        //add a back button with with the appropriate eventListener to the div menu
        let backButton = document.createElement("button");
        backButton.innerText = "Retour";
        backButton.addEventListener("click", () => {
            document.getElementById("deleteLevel").style.display = "none";
            document.getElementById("buttons").style.display = "flex";
        });
        div.appendChild(backButton);
    }

    /**
     * print the menu to modify the order of the maps
     */
    printModifyOrderDiv() {
        //print the div menu
        const div = document.getElementById("modifyLevelsOrder");
        div.innerHTML = "";
        div.style.display = "flex";
        document.getElementById("buttons").style.display = "none";
    
        //add a title for the menu
        let title = document.createElement("h1");
        title.innerText = "Disposition des niveaux";
        div.appendChild(title).className = "title";
    
        //for each map in the list of avalaible maps #mapsList.maps
        for(let i=0; i < this.#mapsList.maps.length; i++) {
    
            //create new divisions
            let divLevel = document.createElement("div");
            let divButton = document.createElement("div");
            let divMap = document.createElement("div");
    
            //create a div which print the map
            let map = document.createElement("boulderdash");
            this.#getMap(map, this.#mapsList.maps[i].layout);
    
            //get the map name
            let mapName = document.createElement("h1");
            mapName.innerText = "---- Map " + (i+1).toString() + " : " + this.#mapsList.maps[i].name + " ----";
    
            //create - button with the appropriate eventListener 
            let minusButton = document.createElement("button");
            minusButton.innerHTML = '<img class="arrowImg" src="../img/up_arrow.png" />';
            minusButton.className = "arrowBtn";
            minusButton.addEventListener("click", () => {
                this.#mapsList.changePosition(i, i-1);
                this.printModifyOrderDiv();
            });
    
            //create + button with the appropriate eventListener 
            let plusButton = document.createElement("button");
            plusButton.innerHTML = '<img class="arrowImg" src="../img/down_arrow.png" />';
            plusButton.className = "arrowBtn";
            plusButton.addEventListener("click", () => {
                this.#mapsList.changePosition(i, i+1);
                this.printModifyOrderDiv();
            });
    
            //imbricate elements and add them to the div menu 
            divButton.appendChild(minusButton);
            divButton.appendChild(plusButton);
    
            divMap.appendChild(map);
            divMap.appendChild(divButton).className = "divButton";
            
            divLevel.appendChild(mapName);
            divLevel.appendChild(divMap).className = "divMap";
    
            div.appendChild(divLevel).className = "divLevel";
            div.appendChild(document.createElement("hr"));
        }
    
        //add a back button with with the appropriate eventListener to the div menu
        let backButton = document.createElement("button");
        backButton.innerText = "Retour";
        backButton.addEventListener("click", () => {
            document.getElementById("modifyLevelsOrder").style.display = "none";
            document.getElementById("buttons").style.display = "flex";
        });
        div.appendChild(backButton);
    }
}




/**
 * attach the click on the button #loadLevelButton with the click action of the input file #file
 */
 document.querySelector("#loadLevelButton").addEventListener("click", () => { document.getElementById('file').click(); });

/**
 * open the index page when click on the button #home
 */
 document.querySelector("#home").addEventListener("click", () => { window.location.href='../index.html'; });

/**
 * attach the mute function to the button #volume
 */
 document.querySelector("#volume").addEventListener("click", () => { mute(levels_management_music) });

/**
 * when the page is completely loaded
 */
window.addEventListener("load", () => {
    
    playOrNot(levels_management_music);

    // declaration of an instance of LevelsManagement
    const levelsManagement = new LevelsManagement();

    /**
     * attach the saveMapsList function of LevelsManagement class called by the variable levelsManagement to the event beforeunload
     */
    window.addEventListener('beforeunload', () => { levelsManagement.saveMapsList(); });

    /**
     *when a new file is upload (not possible to load 2 times in a row the same file), call the addMap function of LevelsManagement class called by the variable levelsManagement
    */
    document.getElementById("file").addEventListener("change", () => { levelsManagement.addMap(); }, false);

    /**
     * attach the printDeleteMapDiv function of LevelsManagement class called by the variable levelsManagement to the button #deleteLevelButton
     */
    document.querySelector("#deleteLevelButton").addEventListener("click", () => { levelsManagement.printDeleteMapDiv(); });

    /**
     * attach the printModifyOrderDiv function of LevelsManagement class called by the variable levelsManagement to the button #modifyLevelsOrderButton
     */
    document.querySelector("#modifyLevelsOrderButton").addEventListener("click", () => { levelsManagement.printModifyOrderDiv(); });

    /**
     * attach the reloadDefaultMaps function of LevelsManagement class called by the variable levelsManagement to the button #reloadDefaultMaps
     */
    document.querySelector("#reloadDefaultMaps").addEventListener("click", () => { levelsManagement.reloadDefaultMaps(); });

});