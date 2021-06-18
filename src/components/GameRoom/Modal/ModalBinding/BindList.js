import React, { useEffect, useMemo } from 'react';
import db from "database";
import classnames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { color } from 'style/theme';
import { suitInPoker } from 'util/suit';
import OptionList from './OptionList';
import { userPickBindState, nowBindState, availibleTricksState, userPassState } from 'store/bind';
import { isUserTurnState, trumpState } from 'store/game';
import { relationWithUser, OrderedStartFromTeamOne } from 'store/players';
import { userNameState, userRoomState } from 'store/user';

const Box = styled.div`
    border-radius: 4px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s all;
    background-color: ${({ theme }) => themeData[theme].bg};
    border-width: ${({ theme }) => theme === 'light' ? 0 : '1px'};
    border-style: solid;
    border-color: ${({ theme }) => themeData[theme].border};

    & > p {
        padding: 8px 0;
        font-size: 16px;
        text-align: center;
        letter-spacing: 1px;
        margin-bottom: 5px;
        transition: 0.3s all;
        border-bottom: 1px solid ${({ theme }) => themeData[theme].border};
        background-color: ${({ theme }) => themeData[theme].status_unable_bg};
        color: ${({ theme }) => themeData[theme].status_unable_fg};
    }

    & > button {
        padding: 8px 0;
        margin-top: 5px;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 2px;
        transition: 0.3s all;
        border-top: 1px solid ${({ theme }) => themeData[theme].border};
        background-color: ${({ theme }) => themeData[theme].call_unable_bg};
        color: ${({ theme }) => themeData[theme].call_unable_fg};
    }

    &.is_user_turn{
        & > p {
            background-color: ${({ theme }) => themeData[theme].status_active_bg};
            color: ${({ theme }) => themeData[theme].status_active_fg};
        }
        & > button {
            background-color: ${({ theme }) => themeData[theme].call_pass_bg};
            color: ${({ theme }) => themeData[theme].call_pass_fg};;

            &.has_pick_bind {
                background-color: ${({ theme }) => themeData[theme].call_active_bg};
                color: ${({ theme }) => themeData[theme].call_active_fg};
            }
        }
    }
`

const Hint = styled.p`
    text-align: center;
    margin-top: 4px;
    letter-spacing: 1px;
    font-size: 12px;
    transition: 0.3s all;
    color: ${({ theme }) => themeData[theme].hint};
`

const themeData = {
    light: {
        bg: 'white',
        status_unable_bg: color.$unable_color,
        status_active_bg: color.$highlight_color,
        status_unable_fg: color.$unable_font_color,
        status_active_fg: color.$title_font_color,
        call_unable_bg: color.$$unable_color,
        call_unable_fg: color.$unable_font_color,
        call_pass_bg: color.$pass_color,
        call_pass_fg: 'white',
        call_active_bg: color.$pink_color,
        call_active_fg: 'white',
        border: 'transparent',
        hint: color.$default_font_color,
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        status_unable_bg: color.$dark_dim_bg_color,
        status_unable_fg: color.$unable_font_color,
        status_active_bg: color.$dark_dim_bg_color,
        status_active_fg: color.$fluorescent_yellow_color,
        call_unable_bg: color.$dark_dim_bg_color,
        call_unable_fg: '#7B7B7B',
        call_pass_bg: color.$dark_dim_bg_color,
        call_pass_fg: color.$fluorescent_green_color,
        call_active_bg: color.$dark_dim_bg_color,
        call_active_fg: color.$fluorescent_pink_color,
        border: color.$dark_dim_border_color,
        hint: 'white',
    },
}

const BindList = ({ theme }) => {
    const [userPickBind, setUserPickBind] = useRecoilState(userPickBindState);
    const [isUserPass, setUserPass] = useRecoilState(userPassState);
    const [nowBind, setNowBind] = useRecoilState(nowBindState);
    const playerList = useRecoilValue(OrderedStartFromTeamOne);
    const [trump, setTrump] = useRecoilState(trumpState);
    const { nextPlayer } = useRecoilValue(relationWithUser);
    const availibleTricks = useRecoilValue(availibleTricksState);
    const isUserTurn = useRecoilValue(isUserTurnState);
    const roomName = useRecoilValue(userRoomState);
    const userName = useRecoilValue(userNameState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(() => {
        const nowBindRef = roomRef.child('gameInfo').child('nowBind');
        nowBindRef.on("value", (data) => {
            const nowBindData = data.val();
            if (nowBindData) {
                setNowBind(nowBindData);
            }
        });
        detectTrumpDecided();
        return () => {
            nowBindRef.off();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if (isUserTurn && isUserPass && !trump) {
            roomRef.child('currentPlayer').set(nextPlayer);
        }
    }, [isUserTurn, isUserPass, nextPlayer, roomRef, trump]);

    const buttonMessage = useMemo(() => {
        const noBind = nowBind.number === 0;
        if (isUserTurn) {
            if (noBind && !userPickBind) return '不能PASS!';
            if (userPickBind) {
                return '喊 ' + userPickBind.number + suitInPoker(userPickBind.suit);
            } else {
                return 'PASS';
            }
        } else {
            return 'PASS';
        }
    }, [isUserTurn, userPickBind, nowBind])

    const callBind = async () => {
        if (!isUserTurn || buttonMessage === '不能PASS!') return;
        const bindRef = roomRef.child('gameInfo').child('nowBind');
        const bindListRef = roomRef.child('gameInfo').child('calledBinds').child(userName);
        const nextPlayerRef = roomRef.child('currentPlayer');
        const calledBind = userPickBind || 'pass';

        await bindListRef.once("value", (data) => {
            const userCalledBinds = data.val();
            if (!userCalledBinds) {
                bindListRef.set([calledBind]);
            } else {
                const newBinds = [...userCalledBinds, calledBind];
                bindListRef.set(newBinds);
            }
            if (userPickBind) {
                bindRef.set({ ...calledBind, player: userName });
            } else {
                setUserPass(true);
            }
        });

        await nextPlayerRef.set(nextPlayer);
        setUserPickBind(null);
    };

    const detectTrumpDecided = () => {
        const bindListRef = roomRef.child('gameInfo').child('calledBinds');
        const nextPlayerRef = roomRef.child('currentPlayer');
        bindListRef.on("value", (data) => {
            const binds = data.val();
            if(!binds) return;
            const passAmount = Object.values(binds)
                .filter(arr => arr
                    .some(bind => bind === 'pass')).length;
            if(passAmount === 3) {
                const nowBindRef = roomRef.child('gameInfo').child('nowBind');
                nowBindRef.once("value", (data) => {
                    const { suit, number, player } = data.val();
                    setTrump({suit, number});
                    nextPlayerRef.set(getNextPlayer(player));
                });
                bindListRef.off();
            }
        });
    }

    const getNextPlayer = (playerName) => {
        const playerIndex = playerList.indexOf(playerName);
        const nextPlayerIndex = playerIndex + 1 > 3 ? playerIndex - 3 : playerIndex + 1;
        return playerList[nextPlayerIndex];
    }

    return (
        <>
            <Box
                theme={theme}
                className={classnames("bind_list", { "is_user_turn": isUserTurn })}>
                <p>{isUserTurn ? '' : 'NOT '}YOUR TURN</p>
                <OptionList
                    theme={theme}
                    isUserTurn={isUserTurn}
                    tricks={availibleTricks} />
                <button
                    onClick={callBind}
                    className={classnames({ "has_pick_bind": userPickBind })}>{buttonMessage}
                </button>
            </Box>
            { userPickBind && <Hint theme={theme}>再次點擊相同選項可以取消選擇</Hint>}
        </>
    )
}

export default BindList;
