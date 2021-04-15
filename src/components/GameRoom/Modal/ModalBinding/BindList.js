import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import { userPickBindState  } from 'store/bind';
import isObjectEquivalent from 'util/isObjectEquivalent';
import { suitInPoker } from 'util/suit'
import OptionButton from './OptionButton';
import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';

const OptionRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;

    &:not(:last-child) {
        border-bottom: 1px solid ${color.$under_line_color};
    }

    .number {
        flex: 0 1 25%;
        margin-right: 15px;
    }
    .suits {
        display: flex;
        justify-content: space-between;
        flex: 1 0 auto;
    }
`

const Options = ({ trickNumber, isUserTurn }) => {
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
        <OptionRow className="option_row">
            <span className="number">{trickNumber}</span>
            <div className="suits">
                {suits.map((suit)=>(
                    <OptionButton 
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

const OptionList = ({ tricks = [], isUserTurn }) => (
    <List className="bind_options">
        {tricks.map(trickNumber => (
            <Options
                key={'trick'+trickNumber}
                trickNumber={trickNumber}
                isUserTurn={isUserTurn}
            />
        ))}
    </List>
);

const Box = styled.div`
    background-color: white;
    border-radius: 4px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    & > p {
        padding: 8px 0;
        font-size: 16px;
        text-align: center;
        letter-spacing: 1px;
        background-color: ${color.$unable_color};
        color: ${color.$unable_font_color};
    }

    & > button {
        padding: 8px 0;
        margin-top: 5px;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 2px;
        background-color: ${color.$unable_color};
        color: ${color.$unable_font_color};
    }

    &.is_user_turn{
            & > p {
                background-color: ${color.$highlight_color};
                color: ${color.$title_font_color};
            }
            & > button {
                background-color: ${color.$pass_color};
                color: white;

                &.has_pick_bind {
                    background-color: ${color.$pink_color};
                }
            }
        }
`

const Hint =styled.p`
    text-align: center;
    margin-top: 4px;
    letter-spacing: 1px;
    font-size: 12px;
`

const BindList = () => {
    const userPickBind = useRecoilValue(userPickBindState);
    const isUserTurn = true;

    const callBind = () => {
        if(!isUserTurn) return;

        if(!userPickBind) {
            console.log('pass')
        } else {
            console.log(userPickBind)
        }
    };

    return (
        <>
            <Box className={classnames("bind_list",{"is_user_turn": isUserTurn})}>
                <p>{isUserTurn?'':'NOT '}YOUR TURN</p>
                <OptionList
                    isUserTurn={isUserTurn}
                    tricks={[1, 2, 3, 4, 5, 6]} />
                <button 
                    onClick={callBind}
                    className={classnames({"has_pick_bind": userPickBind})}>{
                userPickBind 
                    ? ('喊 '+ userPickBind.number + suitInPoker(userPickBind.suit)) 
                    : "PASS"}
                </button>
            </Box>
            { userPickBind && <Hint>再次點擊相同選項可以取消選擇</Hint>}
        </>
    )
}

export default BindList;
