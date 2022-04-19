import LocalStorageKeys from "../util/LocalStorageKeys.js";

export default class Config{
    static CARDS_IN_GAME = 20 // MAX: 20, Must be divisible by two

    static SOUND_ALLOWED = Config.#retrieveSoundSettingFromLocalStorage();

    static #retrieveSoundSettingFromLocalStorage(){
        const soundSetting = window.localStorage.getItem(LocalStorageKeys.SOUND_SETTING)
        if (soundSetting === null){
            window.localStorage.setItem(LocalStorageKeys.SOUND_SETTING, JSON.stringify(true));
            return true;
        }

        else{
            return JSON.parse(soundSetting);
        }
    }
}