import AbstractPage from "./AbstractPage.js";
import GameEndPage from "./GameEndPage.js";

export default class GamePage extends AbstractPage{
    #gameService;
    #clickSound = new Audio("resources/sound/card_flip.wav");
    #matchSound = new Audio("resources/sound/ding.wav");
    #svgNs = "http://www.w3.org/2000/svg";
    static URL_NAME = "game";

    constructor(gameService) {
        super();
        this.#gameService = gameService;
        // TODO history.pushState(GamePage.URL_NAME, "", GamePage.URL_NAME);
    }

    render() {
        super.render();
        let svg = document.createElementNS(this.#svgNs, "svg");
        svg.setAttributeNS(this.#svgNs, "viewBox", "0 0 1000 1000");
        this.main.append(svg);
        this.#renderCards();

        // TODO REMOVE
        const gameEndPage = new GameEndPage(1000);
        gameEndPage.render();
        // TODO REMOVE
    }

    #renderCards(){
        const cards = this.#gameService.cards;
        const cardsSvg = document.createElementNS(this.#svgNs, "g");
        let row = 1;
        let col = 1;
        for (let card of cards) {
            cardsSvg.append(this.#createCard(card, row, col));

            col++;
            if (col === 5){
                col = 1;
                row++;
            }
        }
        document.querySelector("svg").append(cardsSvg);
    }


    #renderCard(card) {
        const html = `<div class="card" data-card-id="${card.id}" data-removed="${card.removed}">
        </div>`;
        //cardDiv.innerText = !card.removed ? card.id + " " + card.pairCardId : "r";

        this.main.insertAdjacentHTML("afterbegin", html);
        document.querySelector(`div[data-card-id="${card.id}"]`).addEventListener("click", this.#cardClick.bind(this));
    }

    #cardClick(e){
        const clickedCardId = parseInt(e.target.parentElement.dataset.cardId);
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

    /**
     * 20 karet
     * 5 radku x 4 sloupce
     * @param card
     * @return {SVGSVGElement}
     */
    #createCard(card, row, col){
        const rect = document.createElementNS(this.#svgNs, "rect");
        rect.setAttributeNS(null, "x", `${col * 120}`);
        rect.setAttributeNS(null, "y", `${row * 120}`);
        rect.setAttributeNS(null, "width", "100");
        rect.setAttributeNS(null, "height", "100");
        rect.classList.add("card_rect");

        const text = document.createElementNS(this.#svgNs, "text");
        text.setAttributeNS(null, "x", `${col * 120 + 50}`);
        text.setAttributeNS(null, "y", `${row * 120 + 50}`);
        //text.innerHTML = (row - 1) * 4 + col;
        text.innerHTML = "?";
        text.classList.add("card_text")

        const img = document.createElementNS(this.#svgNs, "image");
        img.setAttributeNS(null, "x", `${col * 120}`);
        img.setAttributeNS(null, "y", `${row * 120}`);
        img.setAttributeNS(null, "width", "100");
        img.setAttributeNS(null, "height", "100");
        img.setAttributeNS(null, "href", card.svgImgUrl);
        img.style.display = "none";

        const group = document.createElementNS(this.#svgNs, "g");
        group.classList.add("card");
        group.dataset.cardId = card.id;
        group.dataset.removed = card.removed;
        group.addEventListener("click", this.#cardClick.bind(this), true);
        group.append(rect, text, img);

        return group;
    }
}