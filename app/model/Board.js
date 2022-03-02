import Card from "./Card.js"

export default class Board{
    #size;
    #cards = [];

    constructor(size) {
        this.#size = size;
        for (let i = 0; i < size / 2; i++){
            this.#createCardPair();
        }
    }

    #createCardPair() {
        const card1 = new Card(null);
        const card2 = new Card(null); // TODO no content for now
        card1.pairCard = card2;
        card2.pairCard = card1;

        this.#cards.push(card1);
        this.#cards.push(card2);
    }
}