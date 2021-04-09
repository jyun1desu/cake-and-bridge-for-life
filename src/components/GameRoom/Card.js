import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { color } from "style/theme";

function numberInPoker(number) {
    const poker = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
    ];
    return poker[number - 1];
};

function suitInPoker(suit) {
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

function suitColor(suit) {
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

const PokerCard = styled.div`
    display: flex;
    justify-content: space-between;
    z-index: 1;
    background-color: #fafaf7;
    border: 1px solid white;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 2px;

    .card_info {
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;

        &.reverse {
            transform: rotate(180deg);
            z-index: 0;
        }

        .number,
        .suit {
            font-size: 12px;
            text-align: center;
            color: ${props => (props.suit === 'red'
        ? `${color.$red_suit_color}`
        : `${color.$black_suit_color}`)};

            &.suit {
                margin-top: 1px;
            }
        }
    }
    .pattern {
        background-color: white;
        flex: 1 1 100%;
        margin: 10px 4px;
    }

    &.group {
        width: 16vw;
        height: 23vw;
        & + .group {
            margin-left: -11vw;
        }

        &.other_player_card{
            background-color: #eaeaea;
        }
    }
`

const Card = ({ number, suit, className, hasDetail }) => {
    const numberOnCard = numberInPoker(number);
    const suitOnCard = suitInPoker(suit);

    return (
        <PokerCard
            className={classnames(className, "poker_card")}
            suit={suitColor(suit)}
        >
            { hasDetail && (
                <>
                    <div className="card_info">
                        <span className={`number`}>{numberOnCard}</span>
                        <span className={`suit`}>{suitOnCard}</span>
                    </div>
                    <div className="pattern"></div>
                    <div className="card_info reverse">
                        <span className={`number`}>{numberOnCard}</span>
                        <span className={`suit`}>{suitOnCard}</span>
                    </div>
                </>
            )}
        </PokerCard>
    )

}

export default Card