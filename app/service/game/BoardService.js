export default class BoardService{
    #board;

    constructor(board) {
        this.#board = board;
    }

    /**
     * Randomly shuffles the card on the board
     */
    shuffleCards(){
        const shuffledCards = this.#board.cards;
        shuffledCards.sort(() => Math.random() - 0.5);
        this.#board.cards = shuffledCards;
    }

    get cards(){
        return this.#board.cards;
    }
}