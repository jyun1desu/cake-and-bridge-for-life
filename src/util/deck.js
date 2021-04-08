const buildNewDeck = () => {
    const suit = ["spades", "heart", "diamond", "club"];
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const deck = [];
    for (let i = 0; i < suit.length; i++) {
        let card = {};
        for (let j = 0; j < number.length; j++) {
            card = {
                suit: suit[i],
                number: number[j],
            };
            deck.push(card);
        }
    }
    return deck;
};

const shuffle = (deck) => {
    let i = deck.length;
    while (i > 1) {
        let index = Math.floor(Math.random() * i--);
        [deck[i], deck[index]] = [deck[index], deck[i]];
    }
    return deck;
};

const sortCards = (cards) => {
    const sorted = cards.sort((cardA, cardB) => {
        const order = ["spades", "heart", "club", "diamond"];
        cardA = 100 * (4 - order.indexOf(cardA.suit)) + 13 - cardA.number;
        cardB = 100 * (4 - order.indexOf(cardB.suit)) + 13 - cardB.number;
        return cardB - cardA;
    });
    return sorted;
};

const dealCards = (playerAmount, deck) => {
    const players = [];
    for (let i = 0; i < playerAmount; i++) {
        const eachPlayer = [];
        players.push(eachPlayer);
    }
    for (let i = 0; i < deck.length; i++) {
        const playerIndex = i % playerAmount;
        players[playerIndex].push(deck[i]);
    }
    const sorted = players.map((cards) => sortCards(cards));
    return sorted;
};

export const isBadLuck = (deck) => {
    const deckPoint = deck
        .map((card) => card.number)
        .reduce((a, b) => {
            const point = b > 9 ? b - 9 : 0;
            return a + point;
        }, 0);
    return deckPoint < 4;
}

const shuffledDeck = shuffle(buildNewDeck());
const newDeck = dealCards(4, shuffledDeck);
export default newDeck;
