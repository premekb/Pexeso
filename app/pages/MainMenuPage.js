import AbstractPage from "./AbstractPage.js";
import GamePage from "./GamePage.js";
import GameFactory from "../factory/GameFactory.js";
import GameService from "../service/GameService.js";

export default class MainMenuPage extends AbstractPage{
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


        this.main.append(header, startButton);
    }
}