


export const s_game_over = "game_over_sound";
export const s_game_win = "game_win_sound";
export const s_player_death = "player_death_sound";
export const s_diamond = "diamond_sound";
export const s_move = "move_sound";
export const s_rock = "rock_sound";


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

    /**
     * loads the sounds in this.#sounds
     * */
    #loadSounds() {
        let soundPath = [
            [s_game_over, "../sound/game_over.mp3", 0.5],
            [s_game_win, "../sound/game_win.mp3", 0.5],
            [s_player_death, "../sound/player_death.mp3", 0.15],
            [s_diamond, "../sound/diamond.mp3", 0.3],
            [s_move, "../sound/move_2.mp3", 0.15],
            [s_rock, "../sound/rock.mp3", 0.3]
        ];

        for (let k = 0; k < soundPath.length; ++k) {
            this.#sounds[soundPath[k][0]] = new Audio(soundPath[k][1]);
            this.#sounds[soundPath[k][0]].volume = soundPath[k][2];
        }
    }

    /**
     * plays the specified sound
     * same sound can play mutliple times and overlap
     * @param {String} sound
     */
    playSound(sound) {
        let output = this.#sounds[sound].cloneNode();
        output.volume = this.#sounds[sound].volume;
        output.play();
    }

}




