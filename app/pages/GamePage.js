import AbstractPage from "./AbstractPage.js";
import GameEndPage from "./GameEndPage.js";
import ClickedCardsContainer from "../util/ClickedCardsContainer.js";
import HistoryHandler from "../service/other/HistoryHandler.js";
import TimeConverter from "../util/TimeConverter.js";

export default class GamePage extends AbstractPage{
    #gameService;
    #lastClickedCards; // util/ClickedCardsContainer
    #clickSound = new Audio("resources/sound/card_flip.wav");
    #matchSound = new Audio("resources/sound/ding.wav");
    #svgNs = "http://www.w3.org/2000/svg";

    static HISTORY_STATE = "game";

    static OUT_OR_IN_ANIMATION = "out-in";

    static OUT_IN_OUT_ANIMATION = "out-in-out";

    static REMOVED_ANIMATION = "removed";

    constructor(gameService, pushState) {
        super();
        this.#gameService = gameService;
        this.#lastClickedCards = new ClickedCardsContainer();
        if (pushState === undefined || pushState){
            HistoryHandler.pushState(GamePage.HISTORY_STATE);
        }
    }

    render() {
        super.render();

        const timerDiv = this.#createTimer();
        const cardsDiv = this.#createCards();

        const nav = document.createElement("nav");
        const mainMenuButton = this.createMainMenuButton();
        nav.append(mainMenuButton);

        this.main.append(timerDiv, cardsDiv, nav);
    }

    #createTimer(){
        const timerDiv = document.createElement("div");
        timerDiv.id = "timer";
        this.#refreshTimer(timerDiv);
        setInterval(this.#refreshTimer.bind(this, timerDiv) , 1000);
        return timerDiv;
    }

    #refreshTimer(timer){
        const totalSeconds = this.#gameService.timeWithMistakes;

        timer.innerHTML = `Time: <time>${TimeConverter.secondsToMinutesAndSecondsString(totalSeconds)}</time>`;
    }

    #createCards(){
        const divWrapper = this.createDivWrapper();
        const cards = this.#gameService.cards;
        let row = 1;
        let col = 1;
        for (let card of cards) {
            divWrapper.append(this.#createCard(card, row, col));

            col++;
            if (col === 5){
                col = 1;
                row++;
            }
        }
        return divWrapper;
    }


    #cardClick(e){
        const clickedCardId = parseInt(e.target.parentElement.dataset.cardId);
        const clickedCard = this.#gameService.findCardById(clickedCardId);
        if (!this.#shouldHandleCard(clickedCard)) return;

        this.#lastClickedCards.addCard(clickedCard);
        this.#gameService.selectCard(clickedCard);
        this.#playSound(clickedCard);

        if (this.#gameService.wasLastSelectMistake()){
            this.#animatePlusSeconds();
        }

        const cardDiv = document.querySelector("#outline-wrapper");
        this.main.replaceChild(this.#createCards(), cardDiv);

        if (this.#gameService.isGameOver()){
            const gameEndPage = new GameEndPage(this.#gameService.endTimeWithMistakes);
            this.main.classList.add("main-disappearance");
            setTimeout(() => {gameEndPage.render();}, 990);
        }
    }

    #shouldHandleCard(card){
        const sameCardClicked = (this.#lastClickedCards.wasClickedOneTurnAgo(card) && this.#gameService.isCardSelected());
        const removedCardClicked = card.removed;

        return !(sameCardClicked || removedCardClicked);
    }

    #animatePlusSeconds(){
        console.log("animating 10 seconds");
        const plusSecondsSpan = document.createElement("span");
        plusSecondsSpan.innerText = "+10 seconds";
        plusSecondsSpan.classList.add("plusSeconds");
        this.main.append(plusSecondsSpan);
        setTimeout(() => {this.main.removeChild(plusSecondsSpan)}, 1000);
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
        const animationClass = this.#shouldAnimate(card) ? this.#getAnimationClass(card) : "";
        const cardSideClass = this.#gameService.isThisCardSelected(card) ? "back" : "front";
        const cardHtml = `
        <g data-card-id="${card.id}" data-removed="${card.removed}" class="card ${cardSideClass} ${animationClass}">
            <rect width="100%" height="100%" rx="10" ry="10" class="card_rect"/>
            <text x="50%" y="50%" class="card_text">?</text>
            <image width="100%" height="100%" href="${card.svgImgUrl}"></image>
        </g>
        `
        const svg = document.createElementNS(this.#svgNs, "svg");
        svg.addEventListener("click", this.#cardClick.bind(this), true);
        svg.insertAdjacentHTML("afterbegin", cardHtml);

        return svg;
    }

    #shouldAnimate(card){
        if (!this.#gameService.isCardSelected()) return this.#lastClickedCards.wasClicked(card)
        else return this.#lastClickedCards.wasClickedOneTurnAgo(card);
    }

    #getAnimationClass(card){
        if (card.removed){
            if (this.#lastClickedCards.wasClickedTwoTurnsAgo(card)) return "";
            else{
                console.log(card);
                return GamePage.REMOVED_ANIMATION;
            }
        }

        if (!this.#gameService.isCardSelected() && this.#lastClickedCards.wasClickedOneTurnAgo(card)) {
            return GamePage.OUT_IN_OUT_ANIMATION;
        }
        else {return GamePage.OUT_OR_IN_ANIMATION;}
    }
}