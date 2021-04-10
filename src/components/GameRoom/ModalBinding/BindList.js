import React from 'react';
import styled from 'styled-components';
import { color } from 'style/theme';
import { userPickBindState  } from 'store/bind';
import isObjectEquivalent from 'util/isObjectEquivalent';
import OptionButton from './OptionButton';
import { useRecoilValue, useRecoilState } from 'recoil';

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

const Options = ({ trickNumber }) => {
    const suits = ["spades", "diamond", "heart", "club"];
    const [pickBindState,setPickBindState] = useRecoilState(userPickBindState);

    const handlePickBind = (bindData) => {
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

const OptionList = ({ tricks = [] }) => (
    <List className="bind_options">
        {tricks.map(trickNumber => (
            <Options
                key={'trick'+trickNumber}
                trickNumber={trickNumber}
            />
        ))}
    </List>
);

const Box = styled.div`
    background-color: white;
    border-radius: 4px;
    margin-top: 5px;
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

        &.is-user-turn{
            background-color: ${color.$highlight_color};
            color: ${color.$title_font_color};
        }
    }

    & > button {
        padding: 8px 0;
        margin-top: 5px;
        font-size: 16px;
        letter-spacing: 1px;
        background-color: ${color.$unable_color};
        color: ${color.$unable_font_color};
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
    return (
        <>
            <Box>
                <p>YOUR TURN</p>
                <OptionList
                    tricks={[1, 2, 3, 4, 5, 6]} />
                <button>PASS</button>
            </Box>
            { userPickBind && <Hint>再次點擊相同選項可以取消選擇</Hint>}
        </>
    )
}

export default BindList;
