class CardService{
    removeCardPair(card){
        card.remove();
        card.pairCard.remove();
    }
}