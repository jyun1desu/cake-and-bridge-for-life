import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import { userPickBindState  } from 'store/bind';
import isObjectEquivalent from 'util/isObjectEquivalent';
import OptionButton from './OptionButton';
import { useRecoilState } from 'recoil';

const themeData = {
    light: { 
        number_c: color.$default_font_color,
        border: color.$under_line_color
    },
    dark: {
        number_c: 'white',
        border: color.$dark_dim_border_color
    },
}

const OptionRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    &:not(:last-child) {
        transition: 0.5s all;
        border-bottom: 1px solid ${({theme}) => themeData[theme].border };
    }

    .number {
        flex: 0 1 25%;
        margin-right: 15px;
        transition: 0.5s all;
        color: ${({theme}) => themeData[theme].number_c };
    }
    .suits {
        display: flex;
        justify-content: space-between;
        flex: 1 0 auto;
    }
`

const Options = ({ trickNumber, isUserTurn, theme }) => {
    const suits = ["spades", "diamond", "heart", "club"];
    const [pickBindState,setPickBindState] = useRecoilState(userPickBindState);

    const handlePickBind = (bindData) => {
        if(!isUserTurn) return;
        if(isObjectEquivalent(bindData,pickBindState)){
            setPickBindState(null);
        } else {
            setPickBindState(bindData);
        }
    }

    return (
        <OptionRow 
            theme={theme}
            className="option_row">
            <span className="number">{trickNumber}</span>
            <div className="suits">
                {suits.map((suit)=>(
                    <OptionButton 
                        theme={theme}
                        onClick={()=>handlePickBind({suit, number: trickNumber})}
                        key={trickNumber+suit}
                        trickNumber={trickNumber}
                        isPicked={isObjectEquivalent({suit, number: trickNumber},pickBindState)}
                        suit={suit}>
                    </OptionButton>
                ))}
            </div>
        </OptionRow>
    )
}

const List = styled.div`
    max-height: 25vh;
    padding: 5px 10px;
    overflow-y: scroll;
`

const OptionList = ({ tricks = [], isUserTurn, theme }) => (
    <List className="bind_options">
        {tricks.map(trickNumber => (
            <Options         
                theme={theme}
                key={'trick'+trickNumber}
                trickNumber={trickNumber}
                isUserTurn={isUserTurn}
            />
        ))}
    </List>
);

export default OptionList;