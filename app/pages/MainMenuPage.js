import AbstractPage from "./AbstractPage.js";
import GamePage from "./GamePage.js";
import GameFactory from "../factory/GameFactory.js";
import GameService from "../service/GameService.js";
import HighScorePage from "./HighScorePage.js";
import Config from "../config/Config.js";

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
        span.addEventListener("click", () => {
            const header = document.querySelector("#main-menu-header");
            header.style.animation = "spin-header-animation 2s linear";
            setTimeout(() => {
                header.style.animation = "";
            }, 2100)
        })
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
            this.main.classList.add("main-disappearance");
            setTimeout(() => {highScorePage.render();}, 1000);
        })
        return highScoreButton;
    }

    #getStartButton(){
        const startButton = document.createElement("button");
        startButton.innerText = "Start game";
        startButton.addEventListener("click",(e) => {
            this.main.classList.add("main-disappearance");
            setTimeout(() => {
                const gameService = new GameService(GameFactory.createGame(Config.CARDS_IN_GAME));
                const gamePage = new GamePage(gameService);
                gamePage.render();}, 990);
        })
        return startButton;
    }
}