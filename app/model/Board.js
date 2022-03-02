import Card from "./Card.js"

export default class Board{
    #size;
    #cards = [];

    constructor(size) {
        this.#size = size;
        for (let i = 0; i < size; i += 2){
            this.#createCardPair(i);
        }
    }

    #createCardPair(idx) {
        const card1 = new Card(idx);
        const card2 = new Card(idx + 1); // TODO no content for now
        card1.pairCardId = idx + 1;
        card2.pairCardId = idx;
        this.#cards.push(card1);
        this.#cards.push(card2);
    }

    get shuffledCards() {
        const shuffledCards = this.#cards;
        shuffledCards.sort(() => Math.random() - 0.5)
        return shuffledCards;
    }
}