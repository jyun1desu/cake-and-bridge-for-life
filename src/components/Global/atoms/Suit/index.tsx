import React from 'react';
import { CardSuitType } from 'types/card';

const getSuitHtmlCode = (suit: CardSuitType | null | undefined) => {
    switch (suit) {
        case null:
            return (<></>)
        case CardSuitType.Spade:
            return (<>&#9824;&#xFE0E;</>)
        case CardSuitType.Heart:
            return (<>&#9829;&#xFE0E;</>)
        case CardSuitType.Diamond:
            return (<>&#9830;&#xFE0E;</>)
        case CardSuitType.Club:
        default:
            return (<>&#9827;&#xFE0E;</>);
    }
}

interface SuitProperty {
    suit: CardSuitType | null | undefined;
    className?: string;
}

const Suit = (props: SuitProperty) => {
    const { suit, className } = props;
    const suitCode = getSuitHtmlCode(suit);
    return (
        <span className={className}>
            {suitCode}
        </span>
    )
};

export default Suit;