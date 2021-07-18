import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { color } from 'style/theme';
import { ThemeTypes } from 'types/theme';
import { userPickBindState, nowBindState  } from 'store/bind';
import isObjectEquivalent from 'util/isObjectEquivalent';
import OptionButton from './OptionButton';
import { Card, CardSuitType } from 'types/card';

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
        transition: 0.3s all;
        border-bottom: 1px solid ${({theme}) => theme.border };
    }

    .number {
        flex: 0 1 25%;
        margin-right: 15px;
        transition: 0.3s all;
        color: ${({theme}) => theme.number_c };
    }
    .suits {
        display: flex;
        justify-content: space-between;
        flex: 1 0 auto;
    }
`

interface OptionsProperty  {
    trickNumber: number;
    isUserTurn: boolean;
    theme: ThemeTypes;
}

const Options = (props: OptionsProperty) => {
    const { trickNumber, isUserTurn, theme } = props;
    const suits = [CardSuitType.Club, CardSuitType.Diamond, CardSuitType.Heart, CardSuitType.Spade];
    const [pickBindState,setPickBindState] = useRecoilState(userPickBindState);
    const nowBind = useRecoilValue(nowBindState);

    const isUnableBind = (card: Card) => {
        const {suit, number} = card;
        if(nowBind.number > number) return true;
        if(nowBind.number === number) {
            return !(suits.indexOf(suit) > suits.indexOf(nowBind.suit))
        }
        return false;
    }

    const handlePickBind = (bindData: Card) => {
        if(!isUserTurn) return;
        if(isUnableBind(bindData)) return;
        if(isObjectEquivalent(bindData, pickBindState as Card)){
            setPickBindState(null);
        } else {
            setPickBindState(bindData);
        }
    }

    return (
        <OptionRow 
            theme={themeData[theme]}
            className="option_row">
            <span className="number">{trickNumber}</span>
            <div className="suits">
                {suits.map((suit)=>{
                    const called = {suit, number: trickNumber} as Card;
                    return(
                    <OptionButton 
                        key={trickNumber+suit}
                        onClick={()=>handlePickBind(called)}
                        trickNumber={trickNumber}
                        isUnableBind={isUnableBind(called)}
                        isPicked={isObjectEquivalent(called,pickBindState as Card)}
                        suit={suit}
                    />
                )})}
            </div>
        </OptionRow>
    )
}

const List = styled.div`
    max-height: 25vh;
    padding: 0 10px;
    overflow-y: scroll;
`

interface OptionListProperty  {
    tricks: number[];
    isUserTurn: boolean;
    theme: ThemeTypes;
}

const OptionList = (props: OptionListProperty) => {
    const { tricks = [], isUserTurn, theme }  = props;
    
    return (
    <List 
        theme={themeData[theme]}
        className="bind_options">
        {tricks.map(trickNumber => (
            <Options         
                theme={theme}
                key={'trick'+trickNumber}
                trickNumber={trickNumber}
                isUserTurn={isUserTurn}
            />
        ))}
    </List>
)};

export default OptionList;