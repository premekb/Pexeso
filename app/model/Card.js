export default class Card{
    #content;
    #pairCard;
    #removed = false;

    constructor(content) {
        this.#content = content;
    }

    set pairCard(value) {
        this.#pairCard = value;
    }

    get pairCard() {
        return this.#pairCard;
    }

    remove() {
        this.#removed = true;
    }

    get isRemoved() {
        return this.#removed;
    }
}