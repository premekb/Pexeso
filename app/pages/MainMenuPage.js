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
        const header = document.createElement("h1");
        header.innerText = "Pexeso";

        const startButton = document.createElement("button");
        startButton.innerText = "Start game";
        startButton.addEventListener("click",(e) => {
            const gameService = new GameService(GameFactory.createGame(20));
            const gamePage = new GamePage(gameService);
            gamePage.render();
        })

        const highScoreButton = document.createElement("button");
        highScoreButton.innerText = "High score";
        highScoreButton.addEventListener("click", (e) => {
            const highScorePage = new HighScorePage();
            highScorePage.render();
        })

        this.main.append(header, startButton, highScoreButton);
    }
}