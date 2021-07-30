/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import db from "database";
import { useHistory } from "react-router-dom";
import { color } from 'style/theme'
import styled from 'styled-components';

import { playersData, teamArray } from "store/players";
import { userIDState, userRoomState, userTeamState } from "store/user";
import { themeState } from 'store/theme';
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

import { TeamTypes, PlayerData } from 'types/player';
import { ReadyTypes } from 'types/types';

import PlayerWindow from 'components/WaitRoom/PlayerWindow';
import SendInviteLinkButton from 'components/WaitRoom/SendInviteLinkButton';
import TeamRadios from 'components/WaitRoom/TeamRadios';
import Button from 'components/Global/atoms/Button';
import Loading from 'components/Global/molecules/Loading';
import useUserReadyStatus from 'util/hook/useUserReadyStatus';

const themeData = {
    light: {
        bg: color.$theme_background,
    },
    dark: {
        bg: color.$dark_bg_color,
    },
}

const Room = styled.div`
        padding: 5vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: .3s background-color;
        background-color: ${({ theme }) => theme.bg};
        position: relative;

        .start_game {
            letter-spacing: 2px;
            font-size: 16px;
        }

        .copy_link_button {
            margin-left: auto;
        }
`
interface ReadyButtonProperty {
    className: string;
    buttonMessage: string;
    onClick: () => void;
}
const ReadyButton = (props: ReadyButtonProperty) => {
    const { onClick, className, buttonMessage } = props;
    const [theme] = useRecoilState(themeState);

    const getButtonColor = () => {
        switch (theme) {
            case 'light':
            default:
                return buttonMessage === '開打！'
                    ? `${color.$pink_color}`
                    : `${color.$unable_color}`;
            case 'dark':
                return buttonMessage === '開打！'
                    ? `${color.$fluorescent_pink_color}`
                    : `${color.$dark_dim_border_color}`;
        }
    }

    return (
        <Button
            className={className}
            onClick={onClick}
            color={getButtonColor()}
        >
            {buttonMessage}
        </Button>
    )
}

const WaitRoom = () => {
    const history = useHistory();
    const [theme] = useRecoilState(themeState);
    const [buttonMessage, setButtonMessage] = useState('');
    const setPlayerData = useSetRecoilState(playersData);
    const userID = useRecoilValue(userIDState);
    const userTeam = useRecoilValue(userTeamState);
    const roomName = useRecoilValue(userRoomState);
    const team = useRecoilValue(teamArray);
    const [{ userReadyStatus }, { setReadyStatus }] = useUserReadyStatus(ReadyTypes.EnterGame);
    const roomRef = db.database().ref(`/${roomName}`);
    const playersInfo = roomRef.child('playersInfo');
    const isAllReady = roomRef.child('enterGame');

    useEffect(() => {
        const prepareWaitRoom = async () => {
            await initWaitRoomData();
            detectUserDisConnect();
            await playersInfo.once("value", (data) => {
                const playersData = Object.values(data.val()) as PlayerData[];
                const sortedByTimestamp = playersData.sort((a, b) => a.timestamp - b.timestamp);
                const userOrder = sortedByTimestamp.findIndex(data => data.id === userID);
                const userDefaultTeam = userOrder === 0 || userOrder === 3
                    ? TeamTypes.TeamOne
                    : TeamTypes.TeamTwo;

                let userData: { ready: boolean; team: TeamTypes } = {
                    ready: false,
                    team: userTeam || userDefaultTeam
                };

                playersInfo.child(userID).update(userData)
            });

            playersInfo.on("value", async (data) => {
                if (!data.val()) return;
                const playersData = Object.values(data.val()) as PlayerData[];
                const sortedByTimestamp = playersData.sort((a, b) => a.timestamp - b.timestamp);
                setPlayerData(sortedByTimestamp);
            });

            // 監聽四人都ready時進入遊戲
            isAllReady.on("value", async data => {
                if (data.val()) {
                    await enterGame();
                    isAllReady.remove();
                }
            });
        }

        prepareWaitRoom();

        return () => {
            setReadyStatus(false);
            playersInfo.off();
            roomRef
                .child('playersInfo')
                .child(userID)
                .onDisconnect()
                .cancel();
        }
    }, []);

    useEffect(() => {
        if (team.length < 4) {
            return setButtonMessage('人數不足⋯⋯');;
        };
        const teamOneAmount = team.filter(team => team === TeamTypes.TeamOne).length;
        const teamTwoAmount = team.filter(team => team === TeamTypes.TeamTwo).length;
        if (teamOneAmount !== teamTwoAmount) {
            return setButtonMessage('人數不一樣怎麼打！');
        }
        return setButtonMessage('開打！');
    }, [team])

    const detectUserDisConnect = () => {
        roomRef
            .child('playersInfo')
            .child(userID)
            .onDisconnect()
            .remove();
    };

    const initWaitRoomData = async () => {
        const playersInfo = roomRef.child('playersInfo');
        await playersInfo.child(userID).update({ ready: false })
    }

    const enterGame = async () => {
        await initWaitRoomData();
        history.push(`/g/${roomName}/${userID}`);
    }

    return (
        <Room
            theme={themeData[theme]}>
            <SendInviteLinkButton className="copy_link_button" />
            <PlayerWindow />
            <TeamRadios roomName={roomName} userID={userID} />
            <ReadyButton
                className="start_game"
                buttonMessage={buttonMessage}
                onClick={() => {
                    if (buttonMessage !== '開打！') return;
                    setReadyStatus(true);
                }}
            />
            <Loading
                active={userReadyStatus}
                cancelReady={() => setReadyStatus(false)}
            />
        </Room>
    )
}

export default WaitRoom;