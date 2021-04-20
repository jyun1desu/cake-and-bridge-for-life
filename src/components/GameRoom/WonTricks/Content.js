import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import Card from 'components/GameRoom/Card';

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2px;

    .trick {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        & + .trick {
            transition: 0.5s all;
            border-top: 1px solid ${({ theme }) => themeData[theme].b_bottom};
        }

        .card_in_won_trick {
            width: 13vw;
            height: 16vw;
        }
    }
`

const Empty = styled.p`
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    color: ${color.$unable_color};
`

const themeData = {
    light: { 
        b_bottom: color.$under_line_color,
    },
    dark: { 
        b_bottom: color.$dark_dim_border_color,
    },
}

const fake = [
    [{ number: 1, suit: 'club' }, { number: 2, suit: 'club' }, { number: 3, suit: 'heart' }, { number: 4, suit: 'heart' }],
    [{ number: 5, suit: 'heart' }, { number: 6, suit: 'heart' }, { number: 7, suit: 'heart' }, { number: 8, suit: 'heart' }],
    [{ number: 9, suit: 'spades' }, { number: 10, suit: 'spades' }, { number: 11, suit: 'spades' }, { number: 12, suit: 'spades' }],
    [{ number: 9, suit: 'spades' }, { number: 10, suit: 'spades' }, { number: 11, suit: 'spades' }, { number: 12, suit: 'spades' }],
    [{ number: 9, suit: 'spades' }, { number: 10, suit: 'spades' }, { number: 11, suit: 'spades' }, { number: 12, suit: 'spades' }],
];

const Content = () => {
    const [theme] = useRecoilState(themeState);
    return (
        <>
        {!fake.length
        ?<Empty>加把勁！隊友需要你！</Empty>
        :<List 
            theme={theme}
            className="won_trick_list">
            {fake.map((trick, index) => (
            <div 
                key={'trick'+index} 
                className="trick">
                {trick.map(card =>
                (<Card
                    className="card_in_won_trick"
                    key={card.number+card.suit}
                    number={card.number}
                    suit={card.suit}
                    hasDetail
                />))}
            </div>))}
        </List>}
        </>
    )
}

export default Content;