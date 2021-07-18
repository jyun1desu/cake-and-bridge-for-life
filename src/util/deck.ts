import { CardSuitType, Card} from 'types/card';
const buildNewDeck = () => {
    const suit = [CardSuitType.Spade, CardSuitType.Heart, CardSuitType.Diamond, CardSuitType.Club];
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const deck: Card[] = [];
    for (let i = 0; i < suit.length; i++) {
        let card: Card;
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

const shuffle = (deck: Card[]) => {
    let i = deck.length;
    while (i > 1) {
        let index = Math.floor(Math.random() * i--);
        [deck[i], deck[index]] = [deck[index], deck[i]];
    }
    return deck;
};

const sortCards = (cards: Card[]) => {
    const sorted = cards.sort((a: Card, b: Card) => {
        const order = [CardSuitType.Spade, CardSuitType.Heart, CardSuitType.Club, CardSuitType.Diamond];
        const cardAPoint = 100 * (4 - order.indexOf(a.suit)) + 13 - a.number;
        const cardBPoint = 100 * (4 - order.indexOf(b.suit)) + 13 - b.number;
        return cardBPoint - cardAPoint;
    });
    return sorted;
};

const dealCards = (playerAmount: number, deck: Card[]) => {
    const players: Array<Card[]> = [];
    for (let i = 0; i < playerAmount; i++) {
        const eachPlayer: [] = [];
        players.push(eachPlayer);
    }

    for (let i = 0; i < deck.length; i++) {
        const playerIndex = i % playerAmount;
        players[playerIndex].push(deck[i]);
    }
    const sorted = players.map((cards) => sortCards(cards));
    return sorted;
};

const shuffledDeck = () => shuffle(buildNewDeck());

export const generateNewDeck = () => {
    return dealCards(4, shuffledDeck());
};
