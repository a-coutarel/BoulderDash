import { T, V, R, M, P, D } from "./map.js";

export class PlayableMaps {

    //table of name and layout of maps available in the game
    #maps;
    //index of the played map
    #currentMapIndex;

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
    

    set currentMapIndex(currentMapIndex) { this.#currentMapIndex = currentMapIndex; };
    set maps(maps) { this.#maps = maps; };

    get maps() { return this.#maps };
    get currentMapIndex() { return this.#currentMapIndex };

    getCurrentMapLayout() {
        return this.#maps[this.#currentMapIndex].layout;
    }

    getCurrentMapName() {
        return this.#maps[this.#currentMapIndex].name;
    }

    nextMap() {
        this.#currentMapIndex++;
        let data = {};
        if(this.#currentMapIndex == this.#maps.length) {
            data.win = true;
        } else {
            data.win = false;
            data.name = this.#maps[this.#currentMapIndex].name;
            data.layout = this.#maps[this.#currentMapIndex].layout;  
        }
        return data;
    }

    addMap(file, reader) {
        let data = {}
        let name = file.name;
        name = name.replace(".txt", "");
        data.name = name;
        getLayout(file, reader, data);
        setTimeout( () => {this.pushMap(data)}, 500);
    }

    pushMap(data) {
        if(data.isMap) {
            let map = { name : data.name, layout : data.layout }
            this.#maps.push(map);
            alert("La map a bien été ajoutée au jeu.");
        }
        else { alert("Erreur lors de l'importation de la map :\nLa map doit être un fichier texte de 16 lignes composées de 32 caractères chacune (sans espace) avec uniquement les caractères suivants : \nM, D, T, R, V, P."); }
    }

    deleteMap(index) {
        if(this.#maps.length>1){ this.#maps.splice(index, 1); }
        if(index == this.#currentMapIndex) { window.localStorage.removeItem('backup') }
        else { alert("Impossible de supprimer la map, veuillez en ajouter au moins une autre d'abord."); }
    }

    changePostion() {

    }

}


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