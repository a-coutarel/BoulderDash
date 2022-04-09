
// sound references
export const s_game_over = "game_over_sound";
export const s_game_win = "game_win_sound";
export const s_player_death = "player_death_sound";
export const s_diamond = "diamond_sound";
export const s_move = "move_sound";
export const s_rock = "rock_sound";

// musics references
export const m_home = "home_music";
export const m_levels_management = "levels_management_music";
export const m_game = "game_music";



export class SoundPlayer {

    // dictonnary of sounds
    #sounds;

    // active music
    #music;

    /**
     * Constructor
     */
    constructor() {
        this.#sounds = {};

        this.#music = new Audio();

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
            [s_move, "../sound/move.mp3", 0.15],
            [s_rock, "../sound/rock.mp3", 0.3],

            [m_home, "../sound/home_music.mp3", 0.2],
            [m_levels_management, "../sound/levels_management_music.mp3", 0.2],
            [m_game, "../sound/game_music.mp3", 0.2],
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

    /**
     * sets the music played by the soundPlayer
     * @param {String} music
     */
    setMusic(music) {
        this.#music = this.#sounds[music].cloneNode();
        this.#music.volume = this.#sounds[music].volume;
        this.#music.loop = true;
    }

    /**
     * plays the music defined in this.#music
     * */
    playMusic() {
        this.#music.play();
    }

    /**
     * starts or not the playing of the music according to sessionStorage item 'muted'
     * */
    playOrNot() {
        if (window.sessionStorage.getItem('muted') == 'true') { return; }
        this.playMusic();
    }

    /**
     * mutes the music
     * */
    mute() {
        if (this.#music.paused) {
            this.playMusic();
            window.sessionStorage.setItem('muted', 'false');
            return;
        }

        this.#music.muted = !this.#music.muted;
        if (this.#music.muted == true) { window.sessionStorage.setItem('muted', 'true'); }
        else { window.sessionStorage.setItem('muted', 'false'); }
    }

}




