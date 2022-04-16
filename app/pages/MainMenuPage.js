import AbstractPage from "./AbstractPage.js";
import GamePage from "./GamePage.js";
import GameFactory from "../factory/GameFactory.js";
import GameService from "../service/game/GameService.js";
import HighScorePage from "./HighScorePage.js";
import Config from "../config/Config.js";
import HistoryHandler from "../service/other/HistoryHandler.js";
import FileHandler from "../service/other/FileHandler.js";
import CanvasHelper from "../util/CanvasHelper.js";

export default class MainMenuPage extends AbstractPage{
    static HISTORY_STATE = "mainmenu";

    constructor(pushState) {
        super();
        if (pushState === undefined || pushState){
            HistoryHandler.pushState(MainMenuPage.HISTORY_STATE);
        }
    }

    render() {
        super.render();
        const header = this.#getHeader();

        const nav = document.createElement("nav");
        const startButton = this.#getStartButton()
        const highScoreButton = this.#getHighScoreButton();
        const customImageInput = this.#getCustomImageInput();
        const customImageButton = this.#getCustomImageButton(customImageInput);
        const canvasCheckbox = this.#getCanvasCheckbox();

        nav.append(startButton, highScoreButton, customImageButton, canvasCheckbox);

        const divWrapper = this.createDivWrapper();
        const clickMeSpan = this.#getClickMeSpan()
        divWrapper.append(header, nav, customImageInput,clickMeSpan);

        this.main.append(divWrapper);
    }

    #getCanvasCheckbox(){
        const div = document.createElement("div");
        div.id = "canvas-div";
        const textSpan = document.createElement("span");
        textSpan.id = "canvas-span";
        const canvas = document.createElement("canvas");
        canvas.width = 25;
        canvas.height = 25;

        if (FileHandler.isImageSaved()) {
            textSpan.innerText = "Image added";
            CanvasHelper.drawImageAdded(canvas);
        }

        else {
            textSpan.innerText = "No image";
            CanvasHelper.drawNoImage(canvas);
        }

        div.append(canvas, textSpan);

        return div;
    }

    #getCustomImageButton(customImageInput){
        const customImageButton = document.createElement("button");
        customImageButton.innerText = "Custom image";
        customImageButton.id = "custom-image-button";
        customImageButton.addEventListener("click", () => {
            customImageInput.click();
        })
        return customImageButton;
    }

    #getCustomImageInput(){
        const customImageInput = document.createElement("input");
        customImageInput.id = "custom-image-input";
        customImageInput.type = "file";
        customImageInput.addEventListener("change", new FileHandler());
        document.addEventListener("addimage", () => {
            document.querySelector("#canvas-div").replaceWith(this.#getCanvasCheckbox());
        })
        return customImageInput;
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