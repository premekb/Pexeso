export default class GameFactory{
    static createGame(amountOfCards){
        const board = new Board(amountOfCards);
        const game = new Game(board);

        return game;
    }
}