/**
 * Remembers two recently clicked cards.
 */
export default class ClickedCardsContainer{
    #card1
    #card2

    constructor() {
    }

    addCard(newCard) {
        this.#card2 = this.#card1;
        this.#card1 = newCard;
    }

    wasClicked(card) {
        let result = false;

        if (this.#card1 === undefined) {
            return false;
        }

        result = this.#card1.id === card.id;

        if (result) {
            return result;
        }

        else {
            if (this.#card2 === undefined) return false;
            else return this.#card2.id === card.id;
        }
    }

    wasClickedOneTurnAgo(card){
        return this.#card1 !== undefined && this.#card1.id === card.id;
    }

    wasClickedTwoTurnsAgo(card){
        return this.#card2 !== undefined && this.#card2.id === card.id;
    }
}