export default class Game{
    #board;
    #selectedCard;

    constructor(board) {
        this.#board = board;
    }

    get board() {
        return this.#board;
    }


    get selectedCard() {
        return this.#selectedCard;
    }

    set selectedCard(value) {
        this.#selectedCard = value;
    }
}