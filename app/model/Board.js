import Card from "./Card.js"
import FileHandler from "../service/other/FileHandler.js";

export default class Board{
    #size;
    #cards = [];

    constructor(size) {
        this.#size = size;
        let imgCtr = 1;
        for (let i = 0; i < size; i += 2){
            if (i === 0 && FileHandler.isImageSaved()){
                this.#createCardPair(i, FileHandler.getImage());
            }

            else{
                this.#createCardPair(i, `resources/img/cards/card_${imgCtr}.svg`);
            }
            imgCtr++;
        }
    }

    #createCardPair(idx, imgUrl) {
        const card1 = new Card(idx, imgUrl);
        const card2 = new Card(idx + 1, imgUrl);
        card1.pairCardId = idx + 1;
        card2.pairCardId = idx;
        this.#cards.push(card1);
        this.#cards.push(card2);
    }


    get cards() {
        return this.#cards;
    }

    set cards(value) {
        this.#cards = value;
    }
}