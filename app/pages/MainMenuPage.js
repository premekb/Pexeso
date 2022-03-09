import AbstractPage from "./AbstractPage.js";
import GamePage from "./GamePage.js";
import GameFactory from "../factory/GameFactory.js";
import GameService from "../service/GameService.js";
import HighScorePage from "./HighScorePage.js";

export default class MainMenuPage extends AbstractPage{
    #svgNs = "http://www.w3.org/2000/svg";
    static URL_NAME = "mainmenu";

    constructor() {
        super();
        history.pushState(MainMenuPage.URL_NAME, "", MainMenuPage.URL_NAME);
    }

    render() {
        super.render();
        const header = document.createElement("h1");
        header.innerText = "Pexeso";

        const startButton = document.createElement("button");
        startButton.innerText = "Start game";
        startButton.addEventListener("click",(e) => {
            const gameService = new GameService(GameFactory.createGame(2));
            const gamePage = new GamePage(gameService);
            gamePage.render();
        })

        const highScoreButton = document.createElement("button");
        highScoreButton.innerText = "High score";
        highScoreButton.addEventListener("click", (e) => {
            const highScorePage = new HighScorePage();
            highScorePage.render();
        })

        let svg = document.createElementNS(this.#svgNs, "svg")
        svg = this.#setupSvg(svg);

        this.main.append(header, svg, startButton, highScoreButton);
    }

    #setupSvg(svg){
        svg.setAttributeNS(this.#svgNs, "viewBox", "-300 -2O0 600 400");

        const circle = document.createElementNS(this.#svgNs, "circle");
        circle.setAttributeNS(null, "cx", "300");
        circle.setAttributeNS(null, "cy", "200");
        circle.setAttributeNS(null, "r", "20");
        circle.setAttributeNS(null, "fill", "red");

        svg.appendChild(circle);


        return svg;
    }
}