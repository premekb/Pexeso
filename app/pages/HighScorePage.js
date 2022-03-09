import AbstractPage from "./AbstractPage.js";
import GameResultService from "../service/GameResultService.js";
import MainMenuPage from "./MainMenuPage.js";

export default class HighScorePage extends AbstractPage{
    #gameResultService;
    #results;

    constructor() {
        super();
        this.#gameResultService = new GameResultService();
        this.#results = this.#gameResultService.results;
    }

    render() {
        super.render();
        const header = document.createElement("h1");
        header.innerText = "High score";
        this.main.append(header);

        if (this.#results == null){
            const paragraph = document.createElement("paragraph");
            paragraph.innerText = "No results available at the moment.";
            this.main.append(paragraph);
        }
        else{
            const tableElement = this.#createTable();
            this.main.append(tableElement);
        }

        const mainMenuButton = document.createElement("button");
        mainMenuButton.innerText = "Main Menu";
        mainMenuButton.addEventListener("click", (e) => {
            const mainMenuPage = new MainMenuPage();
            mainMenuPage.render();
        })

        this.main.append(mainMenuButton);
    }

    #createTable(){
        const table = document.createElement("table");
        const firstRow = this.#createTableHeading();
        table.append(firstRow);

        for (let gameResult of this.#results){
            const tableRow = this.#createTableEntry(gameResult);
            table.append(tableRow);
        }

        return table;
    }

    #createTableHeading(){
        const firstTableRow = document.createElement("tr");

        const cellsHtml = `
            <th>Name</th>
            <th>Time to beat</th>
            <th>Message from player</th>
            <th>Date played</th>
        `
        firstTableRow.insertAdjacentHTML("afterbegin", cellsHtml)

        return firstTableRow;
    }

    #createTableEntry(gameResult){
        const tableRow = document.createElement("tr");

        const cellsHtml = `
            <td>${gameResult.playerName}</td>
            <td>${gameResult.time}</td>
            <td>${gameResult.message}</td>
            <td>${gameResult.timeSaved.toString()}</td>
        `
        tableRow.insertAdjacentHTML("afterbegin", cellsHtml);

        return tableRow;
    }
}