export const suitColor = (suit) => {
    switch (suit) {
        case "spades":
        case "club":
        default:
            return "black";
        case "heart":
        case "diamond":
            return "red";
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
        default:
            return "♣";
    }
}