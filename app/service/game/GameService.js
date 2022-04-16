import BoardService from "./BoardService.js";

export default class GameService{
    #game;
    #boardService;
    #timeStart = new Date();
    #timeEnd = null;
    #mistakes = 0;
    #wasMistake = false;

    constructor(game) {
        this.#game = game;
        this.#boardService = new BoardService(game.board);
        this.#boardService.shuffleCards();
    }

    get cards() {
        return this.#boardService.cards;
    }

    selectCard(card){
        if (this.isCardSelected()){
            if (this.#game.selectedCard.id === card.id){
                console.log("Same card clicked.");
                return;
            }

            else if (this.#game.selectedCard.pairCardId === card.id) {
                console.log("PairId: ", card.pairCardId, " found!");
                this.#removePair(card, this.#game.selectedCard);
                this.#wasMistake = false;
            }

            else {
                console.log("Selected unmatching cards! First pairId: ", this.#game.selectedCard.pairCardId, " Second pairId: ", card.pairCardId);
                this.#mistakes += 1;
                this.#wasMistake = true;
            }

            this.#setSelectedCard(null);
        }

        else{
            console.log("CardId: ", card.id, ", PairId: ", card.pairCardId, " selected.");
            this.#wasMistake = false;
            this.#setSelectedCard(card);
        }
    }

    #removePair(card1, card2){
        card1.removed = true;
        card2.removed = true;
        if (this.isGameOver()){
            this.#timeEnd = new Date();
            console.log("The game has ended. With time: " + this.endTimeWithMistakes + " seconds");
        }
    }

    #setSelectedCard(card){
        this.#game.selectedCard = card;
    }

    isCardSelected(){
        return this.#game.selectedCard != null;
    }

    isThisCardSelected(card) {
        return this.#game.selectedCard == null ? false : this.#game.selectedCard.id === card.id;
    }

    findCardById(cardId){
        for (let card of this.cards){
            if (card.id === cardId) return card;
        }
        return null;
    }

    isGameOver(){
        for (let card of this.cards){
            if (!card.removed) return false;
        }
        return true;
    }

    /**
     * Can only be called, after the game has already ended
     *
     * @return seconds, time since start + 10 seconds for every mistake
     */
    get endTimeWithMistakes(){
        return Math.round(((this.#timeEnd - this.#timeStart) / 1000) + this.#mistakes * 10);
    }

    get timeWithMistakes(){
        return Math.round(((new Date() - this.#timeStart) / 1000) + this.#mistakes * 10);
    }

    wasLastSelectMistake(){
        return this.#wasMistake;
    }
}