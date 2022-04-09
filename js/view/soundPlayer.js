


export const s_game_over = "game_over_sound";
export const s_game_win = "game_win_sound";
export const s_player_death = "player_death_sound";


export class SoundPlayer {

    // dictonnary of sounds
    #sounds;

    /**
     * Constructor
     */
    constructor() {

        this.#sounds = {};

        this.#loadSounds();
    }


    #loadSounds() {
        let soundPath = [
            [s_game_over, "../sound/game_over.mp3", 0.5],
            [s_game_win, "../sound/game_win.mp3", 0.5],
            [s_player_death, "../sound/player_death.mp3", 0.15]
        ];

        for (let k = 0; k < soundPath.length; ++k) {
            this.#sounds[soundPath[k][0]] = new Audio(soundPath[k][1]);
            this.#sounds[soundPath[k][0]].volume = soundPath[k][2];
        }
    }

    playSound(sound) {
        this.#sounds[sound].play();
    }




}




