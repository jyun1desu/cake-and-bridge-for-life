import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { themeState } from 'store/theme';
import { userWinTricksState } from 'store/winTricks';
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
            transition: 0.3s all;
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

const Content = () => {
    const theme = useRecoilValue(themeState);
    const userWinTricks = useRecoilValue(userWinTricksState);
    return (
        <>
        {!userWinTricks.length
        ?<Empty>加把勁！隊友需要你！</Empty>
        :<List 
            theme={theme}
            className="won_trick_list">
            {userWinTricks.map((trick, index) => (
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