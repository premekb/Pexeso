import AbstractPage from "./AbstractPage.js";
import GameEndPage from "./GameEndPage.js";

export default class GamePage extends AbstractPage{
    #gameService;
    #clickSound = new Audio("resources/card_flip.wav");
    #matchSound = new Audio("resources/ding.wav");

    constructor(gameService) {
        super();
        this.#gameService = gameService;
    }

    render() {
        super.render();
        const cards = this.#gameService.cards;

        for (let card of cards) {
            this.#renderCard(card);
        }
    }

    #renderCard(card) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.dataset.cardId = card.id;
        cardDiv.dataset.removed = card.removed;
        cardDiv.innerText = !card.removed ? card.id + " " + card.pairCardId : "r";

        cardDiv.addEventListener("click", this.#cardClick.bind(this));

        this.main.append(cardDiv);
    }

    #cardClick(e){
        const clickedCardId = parseInt(e.target.dataset.cardId);
        const clickedCard = this.#gameService.findCardById(clickedCardId);
        this.#gameService.selectCard(clickedCard);
        this.#playSound(clickedCard);

        if (this.#gameService.isGameOver()){
            const gameEndPage = new GameEndPage(this.#gameService.timeWithMistakes);
            gameEndPage.render();
        }

        else{
            this.render();
        }
    }

    #playSound(clickedCard){
        if (clickedCard.removed){
            this.#matchSound.play();
        }

        else{
            this.#clickSound.play();
        }
    }
}