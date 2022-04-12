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

        const header = this.#createHeader();
        const form = this.#createForm();

        const divWrapper = this.getDivWrapper();
        divWrapper.append(header, form);

        this.main.append(divWrapper);
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
        const htmlForm = `
        <div>
            <label for="name">Name</label>
            <input type="text" id="name">
        </div>
        
        <div>
            <label for="message">Message</label>
            <input type="text" id="message">
        </div>
        
        <div>
            <label for="location">Location</label>
            <input type="text" id="location" disabled>
        </div>
        
        <input type="hidden" value="${this.#time}">
        
        <input type="submit">
        `

        form.insertAdjacentHTML("afterbegin", htmlForm);
        form.addEventListener("submit", this.#handleForm.bind(this));

        return form;
    }

    #createHeader(){
        const header = document.createElement("h1");
        header.innerHTML = `Congratulations, your time is: <span id="time">${this.#time}</span>`;

        return header;
    }
}