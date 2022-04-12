import AbstractPage from "./AbstractPage.js";
import GamePage from "./GamePage.js";
import GameFactory from "../factory/GameFactory.js";
import GameService from "../service/GameService.js";
import HighScorePage from "./HighScorePage.js";

export default class MainMenuPage extends AbstractPage{
    static URL_NAME = "mainmenu";

    constructor() {
        super();
        // TODO history.pushState(MainMenuPage.URL_NAME, "", MainMenuPage.URL_NAME);
    }

    render() {
        super.render();
        const header = this.#getHeader();
        const startButton = this.#getStartButton()
        const highScoreButton = this.#getHighScoreButton();
        const divWrapper = this.createDivWrapper();
        const clickMeSpan = this.#getClickMeSpan()
        divWrapper.append(header, startButton, highScoreButton, clickMeSpan);

        this.main.append(divWrapper);
    }

    #getClickMeSpan(){
        const span = document.createElement("span");
        span.innerText = "Click me ;)";
        span.id = "click-me";
        return span;
    }

    #getHeader(){
        const header = document.createElement("h1");
        header.innerText = "Pexeso"
        header.id = "main-menu-header"
        return header;
    }

    #getHighScoreButton(){
        const highScoreButton = document.createElement("button");
        highScoreButton.innerText = "High score";
        highScoreButton.addEventListener("click", (e) => {
            const highScorePage = new HighScorePage();
            highScorePage.render();
        })
        return highScoreButton;
    }

    #getStartButton(){
        const startButton = document.createElement("button");
        startButton.innerText = "Start game";
        startButton.addEventListener("click",(e) => {
            const gameService = new GameService(GameFactory.createGame(20));
            const gamePage = new GamePage(gameService);
            gamePage.render();
        })
        return startButton;
    }
}