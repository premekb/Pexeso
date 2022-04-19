import Config from "../../config/Config.js";
import LocalStorageKeys from "../../util/LocalStorageKeys.js";

/**
 * Service for playing sounds and handling the change of sound settings.
 */
export default class SoundHandler {
    #clickSound = new Audio("resources/sound/card_flip.wav");

    #matchSound = new Audio("resources/sound/ding.wav");

    #music = new Audio("resources/sound/music.mp3");


    constructor() {
        this.#music.loop = true;
    }

    /**
     * Changes the music based on the configuration and saves a new configuration into the local storage.
     *
     * @param e custom event = soundsettingschanged
     */
    handleEvent(e){
        Config.SOUND_ALLOWED = !Config.SOUND_ALLOWED;
        window.localStorage.setItem(LocalStorageKeys.SOUND_SETTING, JSON.stringify(Config.SOUND_ALLOWED));
        if (Config.SOUND_ALLOWED){
            this.#music.play();
        }

        else{
            this.#music.pause();
        }
    }

    playCardClick(){
        if (Config.SOUND_ALLOWED){
            this.#clickSound.play();
        }
    }

    playCardMatch(){
        if (Config.SOUND_ALLOWED){
            this.#matchSound.play();
        }
    }

    playMusic(){
        if (Config.SOUND_ALLOWED){
            this.#music.play();
        }
    }
}