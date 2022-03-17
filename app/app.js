import MainMenuPage from "./pages/MainMenuPage.js";
import HistoryHandler from "./util/HistoryHandler.js";

export default class App{
    init(){
        const mainMenuPage = new MainMenuPage();
        mainMenuPage.render();
       // TODO window.addEventListener("popstate", new HistoryHandler()); // TODO refresh stranky? Jak na to?
    }
}