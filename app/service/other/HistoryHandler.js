import GameEndPage from "../../pages/GameEndPage.js";
import GamePage from "../../pages/GamePage.js";
import GameService from "../game/GameService.js";
import GameFactory from "../../factory/GameFactory.js";
import Config from "../../config/Config.js";
import MainMenuPage from "../../pages/MainMenuPage.js";
import HighScorePage from "../../pages/HighScorePage.js";

export default class HistoryHandler{
    static PAGE_PARAMETER = "page";

    static STATE_UID = 0;

    #lastUid;


    constructor() {
    }

    /**
     * Switches the page accordingly.
     *
     * @param e popstate event
     */
    handleEvent(e){
        console.log(e.state);
        const uid = e.state.uid;
        const pageName = e.state.page;
        document.querySelector("main").classList.add("main-disappearance");
        setTimeout(this.switchPage.bind(this, pageName), 990);
    }

    /**
     * Starts a page based on its name. Should be used when moving through the history
     * because the page is started in a way, that no new state is pushed.
     *
     * @param pageName .HISTORY_STATE property on a page
     */
    switchPage(pageName){
        switch (pageName) {
            case GamePage.HISTORY_STATE:
                const gameService = new GameService(GameFactory.createGame(Config.CARDS_IN_GAME));
                new GamePage(gameService, false).render();
                break;

            case HighScorePage.HISTORY_STATE:
                new HighScorePage(false).render();
                break;

            default:
                new MainMenuPage(false).render();
                break;
        }
    }

    static pushState(pageName){
        history.pushState(
            HistoryHandler.getStateDataObject(pageName),
            "",
            `?${HistoryHandler.PAGE_PARAMETER}=${pageName}`
        );
    }

    #wasBackButtonPressed(uid){
        if (this.#lastUid === undefined || this.#lastUid > uid){
            return true;
        }

        return false;
    }

    static getStateDataObject(pageName){
        HistoryHandler.STATE_UID++;
        return {
            uid: HistoryHandler.STATE_UID,
            page: pageName
        }
    }
}