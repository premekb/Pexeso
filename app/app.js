import MainMenuPage from "./pages/MainMenuPage.js";
import HistoryHandler from "./util/HistoryHandler.js";

export default class App{
    init(){
        const historyHandler = new HistoryHandler();
        this.#startPageBasedOnUrl(historyHandler)
        window.addEventListener("popstate", historyHandler); // TODO refresh stranky? Jak na to?
    }

    #startPageBasedOnUrl(historyHandler){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        historyHandler.switchPage(urlParams.get("page"));
    }
}