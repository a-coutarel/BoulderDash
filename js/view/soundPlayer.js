export const s_game_over = "game_over_sound";
export const s_game_win = "game_win_sound";
export const s_player_death = "player_death_sound";
export const s_diamond = "diamond_sound";
export const s_move = "move_sound";
export const s_rock = "rock_sound";

export const home_music = new Audio("../sound/home_music.mp3");
home_music.volume = 0.2;
home_music.loop = true;

export const levels_management_music = new Audio("../sound/levels_management_music.mp3");
levels_management_music.volume = 0.2;
levels_management_music.loop = true;

export const game_music = new Audio("../sound/game_music.mp3");
game_music.volume = 0.2;
game_music.loop = true;

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




/**
 * play the audio or not in function of the value stored in the sessionStorage
 * @param {Audio} audio 
 */
export function playOrNot(audio) {
    if(window.sessionStorage.getItem('muted') == 'true') { return; }
    audio.play();
    window.sessionStorage.setItem('muted', 'false');
}


/**
 *  mute or unmute the audio
 * @param {Audio} audio
 */
 export function mute(audio) {
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