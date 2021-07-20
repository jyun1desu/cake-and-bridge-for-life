import { CardSuitType, Suits, SuitColorType } from 'types/card';
export const suitColor = (suit: Suits | undefined) => {
    switch (suit) {
        case CardSuitType.Spade:
        case CardSuitType.Club:
        default:
            return SuitColorType.Black;
        case CardSuitType.Heart:
        case CardSuitType.Diamond:
            return SuitColorType.Red;
    }
}

export const suitInPoker = (suit: Suits | undefined) => {
    switch (suit) {
        case CardSuitType.Spade:
            return "♠";
        case CardSuitType.Heart:
            return "♥";
        case CardSuitType.Diamond:
            return "♦";
        case CardSuitType.Club:
        default:
            return "♣";
    }
}