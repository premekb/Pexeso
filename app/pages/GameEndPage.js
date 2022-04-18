import AbstractPage from "./AbstractPage.js";
import MainMenuPage from "./MainMenuPage.js";
import GameResult from "../model/GameResult.js";
import GameResultService from "../service/game/GameResultService.js";
import HistoryHandler from "../service/other/HistoryHandler.js";
import TimeConverter from "../util/TimeConverter.js";

export default class GameEndPage extends AbstractPage{
    #time;
    #gameResultService = new GameResultService();

    constructor(time) {
        super();
        this.#time = time;
    }

    render() {
        super.render();

        const header = this.#createHeader();
        const form = this.#createForm();

        const divWrapper = this.createDivWrapper();
        divWrapper.append(header, form);

        this.main.append(divWrapper);
        this.#tryToInsertLocation();
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

        this.main.classList.add("main-disappearance");
        setTimeout(() => {new MainMenuPage().render()}, 990);

    }

    #validateForm(form){
        const nameInput = form.querySelector("#name");
        const messageInput = form.querySelector("#message");
        const name = nameInput.value;
        const message = messageInput.value;
        let valid = true;

        if (name.length === 0 || name.length > 10){
            alert("Your name length must be between 1 and 10 characters.");
            nameInput.classList.add("failed");
            valid = false;
        }

        else{
            nameInput.classList.remove("failed");
        }

        if (message.length === 0 || message.length > 16){
            alert("Your message length must be between 1 and 16 characters");
            messageInput.classList.add("failed");
            valid = false;
        }

        else{
            messageInput.classList.remove("failed");
        }

        return valid;
    }

    #createForm(){
        const form = document.createElement("form");
        const htmlForm = `
        <div>
            <label for="name">Name</label>
            <input type="text" placeholder="Fill in your name please." id="name" autofocus required minlength="1" maxlength="10">
        </div>
        
        <div>
            <label for="message">Message</label>
            <input type="text" placeholder="Fill in your message please." id="message" required minlength="1" maxlength="16">
        </div>
        
        <div>
            <label for="location">Location</label>
            <input type="text" placeholder="Wait please, will get filled in." id="location" disabled>
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
        header.innerHTML = `Congratulations, your time is: <span id="time">${TimeConverter.secondsToMinutesAndSecondsString(this.#time)}</span>`;

        return header;
    }

    #tryToInsertLocation(){
        const success = async (position) => {
            const locationInput = document.querySelector("#location");
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(position.coords);
            const cityConverterUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            const response = await fetch(cityConverterUrl);
            const responseJson = await response.json();

            locationInput.value = responseJson.city.length === 0 ? responseJson.locality : responseJson.city;
        }

        const failure = (e) => {
            const locationInput = document.querySelector("#location");
            if (locationInput !== null){
                locationInput.value = "Unknown";
            }
        }

        if (!navigator.onLine) {
            failure(null);
        }

        else{
            navigator.geolocation.getCurrentPosition(success, failure);
        }
    }
}