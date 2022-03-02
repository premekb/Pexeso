import AbstractPage from "./AbstractPage.js";

export default class GamePage extends AbstractPage{
    #game;

    constructor(game) {
        super();
        this.#game = game;
    }

    render() {
        super.render();
        const cards = this.#game.board.shuffledCards;

        for (let card of cards) {
            this.#renderCard(card);
        }
    }

    #renderCard(card) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.dataset.id = card.id;
        cardDiv.dataset.pairId = card.pairCardId;
        cardDiv.dataset.removed = card.removed;
        cardDiv.innerText = card.id;

        cardDiv.addEventListener("click", this.#cardClick.bind(this));

        this.main.append(cardDiv);
    }

    #cardClick(e){
        console.log(this);
        console.log(e);
    }
}