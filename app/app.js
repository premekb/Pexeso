import MainMenuPage from "./pages/MainMenuPage.js";
import HistoryHandler from "./service/other/HistoryHandler.js";
import SoundHandler from "./service/other/SoundHandler.js";

export default class App{
    init(){
        const historyHandler = new HistoryHandler();
        const soundHandler = new SoundHandler();
        this.#startPageBasedOnUrl(historyHandler);
        this.#startMusicOnInteraction(soundHandler);
        window.addEventListener("popstate", historyHandler);
        window.addEventListener("soundchanged", soundHandler);
    }

    /**
     * If the page is refreshed or bookmarked, then the last page will try to be recovered
     * based on the query parameter in the url.
     *
     * If the query parameter is missing, or is unknown, then mainmenu is started by default.
     *
     * @param historyHandler
     */
    #startPageBasedOnUrl(historyHandler){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        historyHandler.switchPage(urlParams.get("page"));
    }

    /**
     * Starts playing the music only when the user clicks somewhere in the page.
     * The reason for it is that in Chrome user interaction is required before a sound can be played.
     *
     * @param soundHandler
     */
    #startMusicOnInteraction(soundHandler){
        document.body.addEventListener("click", function () {
            soundHandler.playMusic();
        }, {once: true});
    }
}