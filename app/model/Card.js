export default class Card{
    #id;
    // Id of the card that is in pair
    #pairCardId;
    #svgImgUrl;
    #removed = false;

    constructor(id, svgImgUrl) {
        this.#id = id;
        this.#svgImgUrl = svgImgUrl;
        this._svgImgUrl = svgImgUrl;
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


    get svgImgUrl() {
        return this._svgImgUrl;
    }

    set svgImgUrl(value) {
        this._svgImgUrl = value;
    }
}