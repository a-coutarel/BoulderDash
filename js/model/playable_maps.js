import { T, V, R, M, P, D } from "./map.js";

export class PlayableMaps {

    //table of name and layout of maps available in the game
    #maps;
    //index of the played map
    #currentMap;

    constructor() {
        this.#currentMap = 0;
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
            layout : [ [V,T,V,R,T,T,V,T,V,T,T,V,T,T,V,T,T,R,T,V,T,T,P,V,T,T,V,T,V,V,T,T],
            [T,R,T,R,V,T,T,T,T,T,T,V,T,T,R,T,T,T,V,T,T,T,T,R,T,T,T,R,T,T,T,T],
            [V,R,T,T,R,T,T,T,V,V,T,T,T,R,T,T,R,T,R,T,T,R,T,R,T,T,T,M,M,M,M,M],
            [T,T,T,D,R,T,T,R,T,V,V,T,T,T,T,T,R,T,T,T,T,T,V,T,T,T,T,T,T,T,T,R],
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
            [V,T,T,V,V,T,T,T,T,R,T,T,R,V,R,T,T,T,D,V,T,T,R,T,T,T,T,T,T,T,T,T] ] },

            { name : "Hard Map", 
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
            [T,T,T,T,T,T,T,T,T,R,M,T,R,T,T,R,T,R,T,T,R,M,M,T,R,T,T,M,M,T,R,T] ] }
        ];
    }    

    //constructor(param)   newGame dans controller prend le par défaut
                            //et load game celui là


    getCurrentMap() {
        return this.#maps[this.#currentMap];
    }

    nextMap() {
        this.#currentMap++;
        let data = {};
        data.name = this.#maps[this.#currentMap].name;
        data.layout = this.#maps[this.#currentMap].layout;
        return data;
    }

    addMap(name, layout) {
        let map = {
            name : name,
            layout : layout
        }
        this.#maps.push(map);
    }

    deleteMap(index) {
        this.#maps.splice(index, 1);
    }

    changePostion() {

    }

}