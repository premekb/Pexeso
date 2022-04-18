import MainMenuPage from "./pages/MainMenuPage.js";
import HistoryHandler from "./service/other/HistoryHandler.js";

export default class App{
    init(){
        const historyHandler = new HistoryHandler();
        this.#startPageBasedOnUrl(historyHandler)
        window.addEventListener("popstate", historyHandler); // TODO refresh stranky? Jak na to?
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
}