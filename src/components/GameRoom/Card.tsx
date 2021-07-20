import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import classnames from 'classnames';
import { suitColor, suitInPoker } from 'util/suit'
import { Suits, SuitColor } from 'types/card';
import { color } from "style/theme";
import { themeState } from 'store/theme';

function numberInPoker(number: number) {
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

interface PokerCardProperty {
    suitColor: SuitColor;
}

const themeData = {
    light: {
        front_bg: '#FAF9F8',
        back_bg: '#eaeaea',
        border: 'white',
        suit_red: color.$red_suit_color,
        suit_black: color.$black_suit_color,
        pattern: 'white',
        shadow: color.$shadow,
    },
    dark: {
        front_bg: color.$dark_bg_color,
        back_bg: '#312D28',
        border: color.$dark_dim_border_color,
        suit_red: color.$dark_red_suit_color,
        suit_black: color.$dark_black_suit_color,
        pattern: color.$dark_dim_bg_color,
        shadow: 'transparent',
    },
}

const PokerCard = styled.div<PokerCardProperty>`
    z-index: 1;
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 2px;
    transition: all .3s;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.front_bg};

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
            transition: all .3s;
            color: ${({ suitColor, theme }) => theme[`suit_${suitColor}`]};

            &.suit {
                margin-top: 1px;
            }
        }
    }

    .pattern {
        flex: 1 1 100%;
        margin: 10px 4px;
        transition: all .3s;
        background-color: ${({ theme }) => theme.pattern};
    }

    &.group {
        width: 16vw;
        height: 23vw;
        & + .group {
            margin-left: -11vw;
        }

        &.other_player_card{
            background-color: ${({ theme }) => theme.back_bg};;
        }
    }

    &.played_card {
        width: 12.5vw;
        height: 15.5vw;
        box-shadow: 1px 1px 2px 1px ${({ theme }) => theme.shadow};
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

interface CardProperty {
    number?: number;
    suit?: Suits;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    hasDetail?: Boolean;
    nowPickSuit?: Suits | null;
}

const Card = (props: CardProperty) => {
    const { number, suit, className, hasDetail = false, onClick = () => { }, nowPickSuit } = props;
    const theme = useRecoilValue(themeState);
    const numberOnCard = number ? numberInPoker(number) : null;
    const suitOnCard = suit ? suitInPoker(suit) : null;
    const sameSuit = nowPickSuit && (suit === nowPickSuit);
    const isNotPicked = nowPickSuit && (suit !== nowPickSuit);

    return (
        <PokerCard
            theme={themeData[theme]}
            onClick={onClick}
            className={classnames(className, "poker_card",
                {
                    'isPicked': sameSuit,
                    'isNotPicked': isNotPicked,
                })}
            suitColor={suitColor(suit)}
        >
            {hasDetail && (
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