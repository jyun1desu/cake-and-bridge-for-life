import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { suitColor, suitInPoker } from 'util/suit'
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

const PokerCard = styled.div`
    z-index: 1;
    display: flex;
    justify-content: space-between;
    background-color: #fafaf7;
    border: 1px solid white;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 2px;
    transition: 0.3s all;

    .card_info {
        display: flex;
        flex: 0 1 auto;
        flex-direction: column;

        &.reverse {
            transform: rotate(180deg);
        }

        .number,
        .suit {
            font-size: 12px;
            text-align: center;
            color: ${props => (props.suitColor === 'red'
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

    &.played_card {
        width: 12vw;
        height: 15vw;
    }

    &.isPicked{
        flex: 0 0 auto;
        transform: translateY(-30%) scale(1.1);

        &:not(:first-child){
            margin-left: -7vw !important;
        }
    }
    &.isNotPicked{
        &:last-child {
            flex: 0 0 auto;
        }
    }
`

const Card = ({ number, suit, className, hasDetail, onClick = ()=>{}, nowPickSuit}) => {
    const numberOnCard = numberInPoker(number);
    const suitOnCard = suitInPoker(suit);
    const sameSuit = nowPickSuit && (suit === nowPickSuit);
    const isNotPicked = nowPickSuit && (suit !== nowPickSuit);

    return (
        <PokerCard
            onClick={onClick}
            className={classnames(className, "poker_card", 
            {'isPicked': sameSuit,
            'isNotPicked': isNotPicked,
        })}
            suitColor={suitColor(suit)}
        >
            { hasDetail && (
                <>
                    <div className="card_info">
                        <span className={`number`}>{numberOnCard}</span>
                        <span className={`suit`}>{suitOnCard}&#xFE0E;</span>
                    </div>
                    <div className="pattern"></div>
                    <div className="card_info reverse">
                        <span className={`number`}>{numberOnCard}</span>
                        <span className={`suit`}>{suitOnCard}&#xFE0E;</span>
                    </div>
                </>
            )}
        </PokerCard>
    )

}

export default Card