import AbstractPage from "./AbstractPage.js";
import GamePage from "./GamePage.js";
import GameFactory from "../factory/GameFactory.js";

export default class MainMenuPage extends AbstractPage{
    render() {
        super.render();
        const header = document.createElement("h1");
        header.innerText = "Pexeso";

        const startButton = document.createElement("button");
        startButton.innerText = "Start game";
        startButton.addEventListener("click",(e) => {
            const gamePage = new GamePage(GameFactory.createGame(20));
            gamePage.render();
        })


        this.main.append(header, startButton);
    }
}