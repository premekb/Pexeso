import BoardService from "./BoardService.js";

export default class GameService{
    #game;
    #boardService;

    constructor(game) {
        this.#game = game;
        this.#boardService = new BoardService(game.board);
        this.#boardService.shuffleCards();
    }

    get cards() {
        return this.#boardService.cards;
    }

    get selectedPairId() {
        return this.#game.selectedPairId;
    }

    get selectedCardId() {
        return this.#game.selectedCardId;
    }

    selectCard(cardId, pairId){
        if (this.isCardSelected()){
            if (this.#game.selectedCardId === cardId){
                console.log("Card unselected.");
            }

            else if (this.#game.selectedPairId === cardId) {
                console.log("PairId: ", pairId, " found!");
                this.#removePair(cardId, this.#game.selectedCardId);
            }

            else {
                console.log("Selected unmatching cards! First pairId: ", this.#game.selectedPairId, " Second pairId: ", pairId);
            }

            this.#setSelectedCard(null, null);
        }

        else{
            console.log("CardId: ", cardId, ", PairId: ", pairId, " selected.");
            this.#setSelectedCard(cardId, pairId);
        }
    }

    #removePair(cardId1, cardId2){
        for (let card of this.cards) {
            if (card.id === cardId1 || card.id === cardId2) {
                card.removed = true;
            }
        }
    }

    #setSelectedCard(cardId, pairId){
        this.#game.selectedCardId = cardId;
        this.#game.selectedPairId = pairId;
    }

    isCardSelected(){
        return this.#game.selectedCardId != null && this.#game.selectedPairId != null;
    }
}