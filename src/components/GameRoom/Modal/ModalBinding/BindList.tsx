import React, { useEffect, useMemo } from 'react';
import db from "database";
import classnames from 'classnames';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Suit from 'components/Global/Suit';
import { color } from 'style/theme';
import { ThemeTypes } from 'types/theme';
import { CalledBind } from 'types/bind';
import { userPickBindState, nowBindState, availibleTricksState, userPassState } from 'store/bind';
import { isUserTurnState, trumpState } from 'store/game';
import { relationWithUser, OrderedStartFromTeamOne } from 'store/players';
import { userNameState, userRoomState } from 'store/user';
import OptionList from './OptionList';

interface BoxProperty {
    themeType: ThemeTypes;
}

const Box = styled.div<BoxProperty>`
    border-radius: 4px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: 0.3s all;
    background-color: ${({ theme }) => theme.bg};
    border-width: ${({ themeType }) => themeType === ThemeTypes.Light ? 0 : '1px'};
    border-style: solid;
    border-color: ${({ theme }) => theme.border};

    & > p {
        padding: 8px 0;
        font-size: 16px;
        text-align: center;
        letter-spacing: 1px;
        margin-bottom: 5px;
        transition: 0.3s all;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        background-color: ${({ theme }) => theme.status_unable_bg};
        color: ${({ theme }) => theme.status_unable_fg};
    }

    & > button {
        padding: 8px 0;
        margin-top: 5px;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 2px;
        transition: 0.3s all;
        border-top: 1px solid ${({ theme }) => theme.border};
        background-color: ${({ theme }) => theme.call_unable_bg};
        color: ${({ theme }) => theme.call_unable_fg};
    }

    &.is_user_turn{
        & > p {
            background-color: ${({ theme }) => theme.status_active_bg};
            color: ${({ theme }) => theme.status_active_fg};
        }
        & > button {
            background-color: ${({ theme }) => theme.call_pass_bg};
            color: ${({ theme }) => theme.call_pass_fg};;

            &.has_pick_bind {
                background-color: ${({ theme }) => theme.call_active_bg};
                color: ${({ theme }) => theme.call_active_fg};
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
    color: ${({ theme }) => theme.hint};
`

const themeData = {
    light: {
        bg: 'white',
        status_unable_bg: color.$unable_color,
        status_active_bg: color.$highlight_color,
        status_unable_fg: color.$unable_font_color,
        status_active_fg: color.$title_font_color,
        call_unable_bg: color.$unable_color,
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

interface BindListProperty  {
    theme: ThemeTypes;
}

const BindList = (props: BindListProperty) => {
    const { theme } = props;
    const [userPickBind, setUserPickBind] = useRecoilState(userPickBindState);
    const [isUserPass, setUserPass] = useRecoilState(userPassState);
    const [nowBind, setNowBind] = useRecoilState(nowBindState);
    const playerList = useRecoilValue(OrderedStartFromTeamOne);
    const [trump, setTrump] = useRecoilState(trumpState);
    const { nextPlayer } = useRecoilValue(relationWithUser);
    const availibleTricks = useRecoilValue(availibleTricksState);
    const isUserTurn = useRecoilValue(isUserTurnState);
    const roomId = useRecoilValue(userRoomState);
    const userName = useRecoilValue(userNameState);
    const roomRef = db.database().ref(`/${roomId}`);

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
                return (
                    <>
                    {`喊${userPickBind.number}`}
                    <Suit suit={userPickBind.suit} />
                    </>
                )
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
        const userBindListRef = roomRef.child('gameInfo').child('calledBinds').child(userName);
        const nextPlayerRef = roomRef.child('currentPlayer');

        await userBindListRef.once("value", (data) => {
            const userCalledBinds = data.val() || [];
            const calledBind = userPickBind || 'pass';
            const newUserBinds = [...userCalledBinds, calledBind];
            userBindListRef.set(newUserBinds);

            if (userPickBind) {
                bindRef.set({ ...userPickBind , player: userName });
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
            const playersCalledList =  Object.values(binds) as CalledBind[][]
            const passAmount = playersCalledList
                .filter(playerCalledList => {
                    return playerCalledList.some(bind => bind === 'pass');
                }).length;

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

    const getNextPlayer = (playerName: string) => {
        const playerIndex = playerList.indexOf(playerName);
        const nextPlayerIndex = playerIndex + 1 > 3 ? playerIndex - 3 : playerIndex + 1;
        return playerList[nextPlayerIndex];
    }

    return (
        <>
            <Box
                theme={themeData[theme]}
                themeType={theme}
                className={classnames("bind_list", { "is_user_turn": isUserTurn })}>
                <p>{isUserTurn ? '' : 'NOT '}YOUR TURN</p>
                <OptionList
                    theme={theme}
                    isUserTurn={isUserTurn}
                    tricks={availibleTricks} />
                <button
                    onClick={callBind}
                    className={classnames({ "has_pick_bind": userPickBind })}>
                        {buttonMessage}
                </button>
            </Box>
            { userPickBind && <Hint theme={themeData[theme]}>再次點擊相同選項可以取消選擇</Hint>}
        </>
    )
}

export default BindList;
