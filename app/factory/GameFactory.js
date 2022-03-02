import Board from "../model/Board.js";
import Game from "../model/Game.js";

export default class GameFactory{
    static createGame(amountOfCards){
        const board = new Board(amountOfCards);
        const game = new Game(board);

        return game;
    }
}