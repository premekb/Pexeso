export default class Game{
    #board;
    #selectedCardId = null;

    constructor(board) {
        this.#board = board;
    }

    get board() {
        return this.#board;
    }

    get selectedCardId() {
        return this.#selectedCardId;
    }

    set selectedCardId(value) {
        this.#selectedCardId = value;
    }
}