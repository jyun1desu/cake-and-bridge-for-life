const countPoint = (trump, currentSuit, card) => {
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

export const getBiggestCard = (trump, currentSuit, cards) => {
    const point = cards.map((card) => {
        const point = countPoint(trump, currentSuit, card);
        return point;
    });

    const winnerIndex = point.indexOf(Math.max(...point));
    return winnerIndex;
};

// const trump = 'club'
// const currentSuit = 'heart'
// const cards = [{number: 5, suit: 'heart'},{number: 6, suit: 'heart'},{number: 7, suit: 'heart'},{number: 1, suit: 'club'}]

// getBiggestCard(trump, currentSuit, cards)