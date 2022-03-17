import AbstractPage from "./AbstractPage.js";
import MainMenuPage from "./MainMenuPage.js";
import GameResult from "../model/GameResult.js";
import GameResultService from "../service/GameResultService.js";

export default class GameEndPage extends AbstractPage{
    #time;
    #gameResultService = new GameResultService();
    static URL_NAME = "gameend";

    constructor(time) {
        super();
        this.#time = time;
        // TODO history.pushState(GameEndPage.URL_NAME, "", GameEndPage.URL_NAME);
    }

    render() {
        super.render();

        const header = document.createElement("h1");
        header.innerText = "Game End!";

        const paragraph = document.createElement("p");
        paragraph.innerText = "Time: " + this.#time;

        const form = this.#createForm();
        form.addEventListener("submit", this.#handleForm.bind(this));

        this.main.append(header, paragraph, form);
    }

    #handleForm(e){
        e.preventDefault();

        if (!this.#validateForm(e.target)){
            alert("nope");
            return;
        }

        const form = e.target;

        const name = form.querySelector("#name").value;
        const message = form.querySelector("#message").value;
        const gameResult = new GameResult(this.#time, name, message, new Date());
        this.#gameResultService.saveToLocalStorage(gameResult);

        (new MainMenuPage()).render();
    }

    #validateForm(form){
        return true;
    }

    #createForm(){
        const form = document.createElement("form");

        const nameLabel = document.createElement("label");
        nameLabel.htmlFor = "name";
        nameLabel.innerText = "Name";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "name";

        const messageLabel = document.createElement("label");
        messageLabel.htmlFor = "message";
        messageLabel.innerText = "Message";

        const messageInput = document.createElement("input");
        messageInput.type = "text";
        messageInput.id = "message";

        const timeHiddenInput = document.createElement("input");
        timeHiddenInput.type = "hidden";
        timeHiddenInput.value = this.#time;

        const submitInput = document.createElement("input");
        submitInput.type = "submit";

        form.append(nameLabel,nameInput, messageLabel, messageInput, timeHiddenInput, submitInput);

        return form;
    }
}