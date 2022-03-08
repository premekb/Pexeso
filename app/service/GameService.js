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

    selectCard(card){
        if (this.isCardSelected()){
            if (this.#game.selectedCard.id === card.id){
                console.log("Card unselected.");
            }

            else if (this.#game.selectedCard.pairCardId === card.id) {
                console.log("PairId: ", card.pairCardId, " found!");
                this.#removePair(card, this.#game.selectedCard);
            }

            else {
                console.log("Selected unmatching cards! First pairId: ", this.#game.selectedCard.pairCardId, " Second pairId: ", card.pairCardId);
            }

            this.#setSelectedCard(null);
        }

        else{
            console.log("CardId: ", card.id, ", PairId: ", card.pairCardId, " selected.");
            this.#setSelectedCard(card);
        }
    }

    #removePair(card1, card2){
        card1.removed = true;
        card2.removed = true;
    }

    #setSelectedCard(card){
        this.#game.selectedCard = card;
    }

    isCardSelected(){
        return this.#game.selectedCard != null;
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
}