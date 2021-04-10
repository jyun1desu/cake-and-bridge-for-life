export const suitColor = (suit) => {
    switch (suit) {
        case "spades":
        case "club":
            return "black";
        case "heart":
        case "diamond":
            return "red";
        default:
            return null
    }
}

export const suitInPoker = (suit) => {
    switch (suit) {
        case "spades":
            return "♠";
        case "heart":
            return "♥";
        case "diamond":
            return "♦";
        case "club":
            return "♣";
        default:
            break;
    }
    return suit;
}