import AbstractPage from "./AbstractPage.js";
import GameResultService from "../service/GameResultService.js";
import MainMenuPage from "./MainMenuPage.js";

export default class HighScorePage extends AbstractPage{
    #gameResultService;
    #results;
    static URL_NAME = "highscore";

    constructor() {
        super();
        this.#gameResultService = new GameResultService();
        this.#results = this.#gameResultService.results == null ? [] : this.#gameResultService.results ;
        // TODO history.pushState(HighScorePage.URL_NAME, "", HighScorePage.URL_NAME);
    }

    render() {
        super.render();

       /** if (this.#results == null){
            const paragraph = document.createElement("paragraph");
            paragraph.innerText = "No results available at the moment.";
            this.main.append(paragraph);
        }
        else{
            const tableElement = this.#createTable();
            this.main.append(tableElement);
        }*/

        const tableElement = this.#createTable();
        this.main.append(tableElement);

        const mainMenuButton = this.createMainMenuButton();

        this.main.append(mainMenuButton);
    }

    #createTable(){
        const table = document.createElement("table");
        const tableHead = this.#createTableHeading();
        table.append(tableHead);

        const tableBody = document.createElement("tbody");
        let tableRow;
        for (let i = 0; i < 10; i++){
            if (i < this.#results.length) {
                tableRow = this.#createTableEntry(this.#results[i]);
            }
            else {
                tableRow = this.#createEmptyTableEntry();
            }
            tableBody.append(tableRow);
        }

        table.append(tableBody);
        return table;
    }

    #createTableHeading(){
        const thead = document.createElement("thead");
        const firstTableRow = document.createElement("tr");
        thead.append(firstTableRow);

        const cellsHtml = `
            <th>Name</th>
            <th>Time to beat</th>
            <th>Message from player</th>
            <th>Date played</th>
        `
        firstTableRow.insertAdjacentHTML("afterbegin", cellsHtml)

        return thead;
    }

    #createEmptyTableEntry(){
        const tableRow = document.createElement("tr");

        const cellsHtml = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        `
        tableRow.insertAdjacentHTML("afterbegin", cellsHtml);

        return tableRow;
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