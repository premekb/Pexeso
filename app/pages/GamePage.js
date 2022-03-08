import AbstractPage from "./AbstractPage.js";

export default class GamePage extends AbstractPage{
    #gameService;

    constructor(gameService) {
        super();
        this.#gameService = gameService;
    }

    render() {
        super.render();
        const cards = this.#gameService.cards;

        for (let card of cards) {
            if (!card.removed){
                this.#renderCard(card);
            }
        }
    }

    #renderCard(card) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.dataset.id = card.id;
        cardDiv.dataset.pairId = card.pairCardId;
        cardDiv.dataset.removed = card.removed;
        cardDiv.innerText = card.id + " " + card.pairCardId;

        cardDiv.addEventListener("click", this.#cardClick.bind(this));

        this.main.append(cardDiv);
    }

    #cardClick(e){
        const clickedCardId = parseInt(e.target.dataset.id);
        const clickedPairId = parseInt(e.target.dataset.pairId);
        this.#gameService.selectCard(clickedCardId, clickedPairId);
        this.render();
    }
}