import AbstractPage from "./AbstractPage.js";
import GameResultService from "../service/GameResultService.js";
import MainMenuPage from "./MainMenuPage.js";
import HistoryHandler from "../util/HistoryHandler.js";
import TimeConverter from "../util/TimeConverter.js";

export default class HighScorePage extends AbstractPage{
    #gameResultService;
    #results;
    static HISTORY_STATE = "highscore";

    constructor(pushState) {
        super();
        this.#gameResultService = new GameResultService();
        this.#results = this.#gameResultService.results == null ? [] : this.#gameResultService.results;
        this.#results.sort((a, b) => { return a.time - b.time});

        if (pushState === undefined || pushState){
            HistoryHandler.pushState(HighScorePage.HISTORY_STATE);
        }
    }

    render() {
        super.render();

        const tableElement = this.#createTable();

        const nav = document.createElement("nav");
        const mainMenuButton = this.createMainMenuButton();
        nav.append(mainMenuButton);

        this.main.append(tableElement, nav);
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
            <td><time>${TimeConverter.secondsToMinutesAndSecondsString(gameResult.time)}</time></td>
            <td>${gameResult.message}</td>
            <td><time>${gameResult.timeSaved.toString()}</time></td>
        `
        tableRow.insertAdjacentHTML("afterbegin", cellsHtml);

        return tableRow;
    }
}