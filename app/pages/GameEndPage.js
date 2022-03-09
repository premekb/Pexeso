import AbstractPage from "./AbstractPage.js";

export default class GameEndPage extends AbstractPage{
    #time;

    constructor(time) {
        super();
        this.#time = time;
        console.log(time);
    }

    render() {
        super.render();

        const header = document.createElement("h1");
        header.innerText = "Game End!";

        const paragraph = document.createElement("p");
        paragraph.innerText = "Time: " + this.#time;

        const form = this.#createForm();

        this.main.append(header, paragraph, form);
    }

    #createForm(){
        const form = document.createElement("form");

        const nameInput = document.createElement("input");
        nameInput.type = "text";

        const messageInput = document.createElement("input");
        messageInput.type = "text";

        const timeHiddenInput = document.createElement("input");
        timeHiddenInput.type = "hidden";
        timeHiddenInput.value = this.#time;

        const submitInput = document.createElement("input");
        submitInput.type = "submit";

        form.append(nameInput, messageInput, timeHiddenInput, submitInput);

        return form;
    }
}