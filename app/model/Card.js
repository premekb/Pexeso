export default class Card{
    #id;
    // Id of the card that is in pair
    #pairCardId;
    #content;
    #removed = false;

    constructor(id, content) {
        this.#id = id;
        this.#content = content;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }


    get pairCardId() {
        return this.#pairCardId;
    }

    set pairCardId(value) {
        this.#pairCardId = value;
    }

    get removed() {
        return this.#removed;
    }

    set removed(value) {
        this.#removed = value;
    }

    remove() {
        this.#removed = true;
    }

    get isRemoved() {
        return this.#removed;
    }
}