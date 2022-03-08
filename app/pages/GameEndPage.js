import AbstractPage from "./AbstractPage.js";

export default class GameEndPage extends AbstractPage{
    #time;

    constructor(time) {
        super();
        this.#time = time;
    }

    render() {
        super.render();
        const header = document.createElement("h1");
        header.innerText = "Game End!";

        this.main.append(header);
    }
}