import { Card, CardSuitType } from 'types/card';

const countPoint = (trump: CardSuitType, currentSuit: CardSuitType, card: Card) => {
    let point = 0;
    if (card.suit === trump) {
        point += 20;
    }
    if (card.suit !== trump && card.suit !== currentSuit) {
        point -= 20;
    }
    point += card.number;
    return point;
};

export const getBiggestCard = (trump: CardSuitType, currentSuit: CardSuitType, cards: Card[]) => {
    const point = cards.map((card) => {
        const point = countPoint(trump, currentSuit, card);
        return point;
    });

    const winnerIndex = point.indexOf(Math.max(...point));
    return winnerIndex;
};