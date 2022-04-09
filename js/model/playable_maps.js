import { T, V, R, M, P, D } from "./map.js";

export class PlayableMaps {

    //table of name and layout (grid of map elements) of available maps in the game
    #maps;
    
    //index of the currently played map
    #currentMapIndex;

    /**
     * Constructor
     * make 3 default maps
     */
    constructor() {
        this.#currentMapIndex = 0;
        this.#maps = [ 
            { name : "Easy Map",
            layout : [ [T,T,T,T,T,T,V,T,T,D,T,R,V,T,T,T,T,T,R,T,R,T,T,T,T,T,T,T,V,T,T,T],
            [T,R,P,R,T,T,T,T,T,T,V,T,T,T,T,T,T,T,T,T,R,D,T,T,R,T,T,T,T,V,T,T],
            [T,T,T,T,T,T,T,T,T,T,V,T,T,V,T,T,T,T,T,R,T,R,T,T,R,T,T,T,T,T,T,T],
            [R,T,R,V,T,T,T,T,T,T,T,T,T,R,T,T,T,T,T,T,R,T,T,R,T,T,T,T,R,T,T,T],
            [R,T,V,R,T,T,T,T,T,T,T,T,T,R,R,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T],
            [T,T,T,R,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,R,T,V,R,T,T,T,T,T,T,T],
            [M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,T,T],
            [T,V,T,T,T,R,T,T,D,T,V,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,D,T,R,V,T,T],
            [T,T,D,T,T,T,T,T,R,T,T,T,T,T,V,T,T,T,T,T,T,T,T,R,V,V,R,T,T,D,T,T],
            [T,T,T,R,T,T,R,T,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,R,R,T,R,T,T,R,T,T],
            [T,V,T,T,T,T,T,R,T,T,T,T,T,T,T,T,R,R,V,T,T,T,T,T,T,T,R,T,T,R,T,D],
            [T,R,T,T,V,T,T,R,T,V,V,T,T,T,T,T,R,T,R,D,T,T,D,T,T,T,T,R,T,T,T,R],
            [T,D,R,T,T,T,T,T,T,T,T,T,T,T,T,T,T,R,R,R,T,T,R,T,T,T,T,T,T,T,T,D],
            [T,T,T,T,T,T,T,T,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M,M],
            [V,V,T,T,T,T,T,T,T,T,T,V,T,T,T,D,T,T,T,T,R,T,T,T,T,R,V,T,T,R,V,D],
            [R,V,T,T,T,T,T,T,T,T,T,R,R,T,T,R,T,T,T,T,T,T,T,T,R,T,T,T,T,T,R,T] ] },

            { name : "Medium Map", 
            layout : [ [T,D,T,M,R,T,T,T,T,T,R,T,T,T,M,T,T,T,T,R,T,T,R,M,R,T,T,T,M,T,R,D],
            [R,M,T,M,T,T,T,R,T,R,T,T,R,T,T,T,T,R,T,M,T,T,M,M,M,T,T,T,M,T,R,T],
            [M,M,T,M,T,T,P,T,T,T,T,R,M,M,T,R,T,T,T,T,T,M,T,T,T,T,R,T,T,D,R,V],
            [R,T,T,T,T,T,T,R,R,T,R,T,T,T,T,T,T,R,T,T,T,M,T,T,T,T,R,T,T,R,M,R],
            [M,T,T,T,T,T,T,R,R,T,R,T,T,T,T,T,T,T,D,M,M,T,R,T,T,M,M,T,R,T,T,M],
            [T,T,M,M,D,T,T,R,T,T,T,T,T,T,R,R,T,R,T,T,T,T,T,T,R,T,T,T,M,T,T,T],
            [R,T,M,T,R,T,T,M,T,T,T,T,T,T,R,R,T,R,T,T,T,T,M,T,T,T,R,R,T,R,T,T],
            [R,T,D,T,T,R,M,T,T,R,M,T,M,T,R,T,T,R,M,M,T,T,R,T,D,T,T,T,T,T,T,D],
            [M,T,R,T,T,M,T,T,T,M,T,D,T,T,R,T,T,R,M,M,T,T,R,T,D,R,T,M,M,T,M,T],
            [M,T,R,T,D,T,T,R,M,T,T,T,R,M,T,T,R,M,D,M,T,D,T,T,R,M,R,R,T,T,T,T],
            [M,M,T,R,T,T,M,M,T,T,T,T,R,M,T,T,R,M,R,M,T,R,T,T,R,M,M,T,T,T,M,T],
            [M,M,T,R,T,M,M,T,T,T,T,T,R,T,T,T,M,T,T,T,T,R,T,T,R,M,M,T,T,T,M,T],
            [T,T,T,M,T,T,T,T,R,R,T,R,T,T,R,T,T,T,T,R,M,T,T,R,M,T,M,T,D,T,M,T],
            [D,T,M,M,T,M,T,T,T,T,T,T,M,R,T,M,T,T,T,D,T,T,T,M,T,T,T,T,R,T,T,R],
            [T,T,M,T,T,T,T,T,T,R,M,T,R,T,T,T,R,T,R,T,T,R,M,T,T,T,D,T,M,T,T,R],
            [T,T,T,T,T,T,T,T,T,R,M,T,R,T,T,R,T,R,T,T,R,M,M,T,R,T,T,M,M,T,R,T] ] },

            { name : "Hard Map",
            layout : [ [V,T,V,R,T,T,V,T,V,T,T,V,T,T,V,T,T,R,T,V,T,T,P,V,T,T,V,T,V,V,T,T],
            [T,R,T,R,V,T,T,T,T,T,T,V,T,T,R,T,T,T,V,T,T,T,T,R,T,T,T,R,T,T,T,T],
            [V,R,T,T,R,T,T,T,V,V,T,T,T,R,T,T,R,T,R,T,T,R,T,R,T,T,T,M,M,M,M,M],
            [T,T,T,D,T,T,T,R,T,V,V,T,T,T,T,T,R,T,T,T,T,T,V,T,T,T,T,T,T,T,T,R],
            [M,M,M,M,M,M,M,M,M,M,M,M,T,T,R,T,R,T,T,T,T,V,T,V,V,T,T,T,T,T,T,R],
            [T,V,V,T,T,T,V,T,T,V,T,V,V,T,T,V,T,V,V,T,T,T,T,V,R,R,V,T,T,T,T,T],
            [T,T,T,V,V,T,T,T,V,V,V,T,V,T,T,V,T,V,V,T,T,T,T,T,R,T,V,R,T,T,V,T],
            [T,T,R,T,R,T,T,R,V,V,V,T,T,T,T,R,T,T,T,T,T,D,T,T,T,V,R,R,T,T,R,T],
            [T,T,T,T,T,R,V,T,D,R,V,T,T,V,T,R,D,V,R,V,T,V,T,T,T,R,R,R,T,T,R,T],
            [R,T,R,T,T,T,V,T,R,T,V,T,T,T,T,T,V,T,T,R,T,T,T,V,T,T,T,T,R,T,D,R],
            [T,T,T,T,T,T,R,T,R,V,T,T,T,T,T,T,R,R,T,T,R,T,T,T,M,M,M,M,M,M,M,M],
            [T,R,R,T,T,T,T,T,T,R,T,T,R,T,V,T,T,T,V,T,R,V,T,R,T,T,R,T,V,V,T,T],
            [M,M,M,M,M,M,M,M,M,M,M,M,R,T,T,T,T,T,T,T,R,T,T,T,T,T,T,V,T,T,T,T],
            [T,T,V,T,T,T,V,V,T,T,T,D,T,T,R,T,V,T,T,R,T,R,R,R,T,T,T,T,T,T,T,T],
            [T,T,R,T,T,R,T,V,T,V,T,T,T,M,M,M,M,M,M,M,M,T,T,D,R,T,T,T,R,R,R,T],
            [V,T,T,V,V,T,T,T,T,R,T,R,T,V,V,T,T,T,D,V,T,T,R,T,T,T,T,T,T,T,T,T] ] }
        ];
    } 
    

    /**
     * setters
     */
    set currentMapIndex(currentMapIndex) { this.#currentMapIndex = currentMapIndex; };

    set maps(maps) { this.#maps = maps; };

    /**
     * getters
     */
    get maps() { return this.#maps };

    get currentMapIndex() { return this.#currentMapIndex };

    /**
     * @returns layout of the currently played map
     */
    getCurrentMapLayout() {
        return this.#maps[this.#currentMapIndex].layout;
    }

    /**
     * @returns name of the currently played map
     */
    getCurrentMapName() {
        return this.#maps[this.#currentMapIndex].name;
    }

    /**
     * if there isn't next map, that means the player has finished the game and so this function will notify the MapControlle of the victory
     * @returns data of the next map
     */
    nextMap() {
        this.#currentMapIndex++;
        let data = {};
        if(this.#currentMapIndex == this.#maps.length) {
            data.win = true;
            window.sessionStorage.setItem('win', 'true');
        } else {
            data.win = false;
            data.name = this.#maps[this.#currentMapIndex].name;
            data.layout = this.#maps[this.#currentMapIndex].layout;  
        }
        return data;
    }

    /**
     * prepare the data of the map file that have to be add to the list of maps
     * @param {any.txt file} file 
     * @param {FileReader} reader 
     */
    addMap(file, reader) {
        let data = {}
        let name = file.name;
        name = name.replace(".txt", "");
        data.name = name;
        getLayout(file, reader, data);
        setTimeout( () => {this.pushMap(data)}, 500);
    }

    /**
     * add map to the list of avalaible maps
     * and delete the game backup
     * @param {any} data : data of the map
     */
    pushMap(data) {
        if(data.isMap) {
            let map = { name : data.name, layout : data.layout }
            this.#maps.push(map);
            window.localStorage.removeItem('backup');
            alert("La map a bien été ajoutée au jeu.");
        }
        else { alert("Erreur lors de l'importation de la map :\nLa map doit être un fichier texte de 16 lignes composées de 32 caractères chacune (sans espace) avec uniquement les caractères suivants : \nM, D, T, R, V, P."); }
    }

    /**
     * delete the map of the list of available maps
     * and delete the game backup
     * @param {int} index : index of the map that will be deleted
     */
    deleteMap(index) {
        if(this.#maps.length > 1){ 
            this.#maps.splice(index, 1); 
            window.localStorage.removeItem('backup');
        }
        else { alert("Impossible de supprimer la map, veuillez en ajouter au moins une autre d'abord."); }
    }

    /**
     * change the position of a map in the list of available maps
     * and delete the game backup
     * @param {int} fromIndex 
     * @param {int} toIndex 
     */
    changePosition(fromIndex, toIndex) {
        if(toIndex == this.#maps.length) { toIndex = 0; }
        if(toIndex == -1) { toIndex = this.#maps.length - 1; }
        let element = this.#maps[fromIndex];
        this.#maps.splice(fromIndex, 1);
        this.#maps.splice(toIndex, 0, element);
        window.localStorage.removeItem('backup');
    }

}

/**
 * read the file and convert it to a table which layout is the same as map layout
 * @param {any.txt file} file 
 * @param {FileReader} reader 
 * @param {any} data 
 * @returns data
 */
function getLayout(file, reader, data) {
    data.isMap = true;
    let layout = []
    let decomposed_line = [];
    let char;

    reader.onload = function(progressEvent) {

        let lines = this.result.split('\n');
        if(lines.length != 16) { data.isMap = false; }

        for(let line = 0; line < lines.length; line++) {
            lines[line].toUpperCase();

            for(let i = 0; i < lines[line].length; i++) {
                char = lines[line].charAt(i);
                if(char != '\r' && char != '\n') { decomposed_line[i] = char }
            }

            if(decomposed_line.length != 32) { data.isMap = false; }
            layout[line] = decomposed_line;
            decomposed_line = [];

        }
        };

    reader.readAsText(file);
    data.layout = layout;
    return data;
}