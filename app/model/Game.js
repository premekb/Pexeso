export default class Game{
    #board;
    #selectedCardId = null;
    #selectedPairId = null;

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

    get selectedPairId() {
        return this.#selectedPairId;
    }

    set selectedPairId(value) {
        this.#selectedPairId = value;
    }
}