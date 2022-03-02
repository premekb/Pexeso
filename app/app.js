import MainMenuPage from "./pages/MainMenuPage.js";

export default class App{
    init(){
        const mainMenuPage = new MainMenuPage();
        mainMenuPage.render();
    }
}