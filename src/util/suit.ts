import { CardSuitType, SuitColorType } from 'types/card';
export const suitColor = (suit: CardSuitType | undefined | null) => {
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

export const suitInPoker = (suit: CardSuitType | undefined) => {
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