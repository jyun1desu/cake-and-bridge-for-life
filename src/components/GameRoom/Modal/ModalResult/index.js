import React, { useEffect, useState } from 'react';
import db from "database";
import Lottie from 'react-lottie';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { modalState } from 'store/modal';
import { userTeamState, userRoomState, userIDState, userNameState } from 'store/user';
import { color } from 'style/theme';
import Modal from 'components/Global/Modal';
import Button from 'components/Global/Button';
import mainFireWork from 'assets/fireworks/16764-firework-animaiton.json';
import subFireWork from 'assets/fireworks/14438-fireworks.json';
import thirdFireWork from 'assets/fireworks/lf30_editor_he0cup9w.json';
import sleep from 'util/sleep';

const AninimationBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    & > div {
        &:nth-child(1) {
            position: absolute;
            left: -30px;
            top: -100px;
        }
        &:nth-child(2) {
            position: absolute;
            left: 30px;
            top: 300px;
        }
        &:nth-child(3) {
            position: absolute;
            left: -10px;
            top: 20px;
        }
        &:nth-child(4) {
            position: absolute;
            left: 100px;
            top: 20px;
        }
        &:nth-child(5) {
            position: absolute;
            left: 50px;
            top: 400px;
        }
        &:nth-child(6) {
            position: absolute;
            left: -80px;
            top: -20px;
        }
        &:nth-child(7) {
            position: absolute;
            left: -50%;
            top: 25%;
        }
        &:nth-child(8) {
            position: absolute;
            left: 20%;
            top: 60%;
        }
        &:nth-child(9) {
            position: absolute;
            left: -30%;
            bottom: 10%;
        }
        &:nth-child(10) {
            position: absolute;
            left: 0;
            bottom: 10%;
        }
        &:nth-child(11) {
            position: absolute;
            left: -30%;
            top: 10%;
        }
        &:nth-child(12) {
            position: absolute;
            left: -50%;
            top: 60%;
        }
    }
`

const Animations = () => {
    const [delay, toggleDelay] = useState(false);

    const setDelay = async () => {
        await sleep(600);
        toggleDelay(true)
    }

    useEffect(() => {
        setDelay()
    }, [])

    const mainFireWorkData = {
        loop: true,
        autoplay: true,
        animationData: mainFireWork,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const subFireWorkData = {
        loop: true,
        autoplay: true,
        animationData: subFireWork,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const thirdFireWorkData = {
        loop: true,
        autoplay: true,
        animationData: thirdFireWork,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <AninimationBox>
            { delay && <Lottie options={thirdFireWork}
                height={500}
                width={500}
            />}
            { delay && <Lottie options={mainFireWorkData}
                height={600}
                width={600}
            />}
            { delay && <Lottie options={thirdFireWork}
                height={500}
                width={500}
            />}
            <Lottie options={mainFireWorkData}
                height={300}
                width={300}
            />
            { delay && <Lottie options={thirdFireWork}
                height={250}
                width={300}
            />}
            <Lottie options={subFireWorkData}
                height={300}
                width={300}
            />
            <Lottie options={thirdFireWorkData}
                height={300}
                width={300}
            />
            { delay && <Lottie options={thirdFireWorkData}
                height={300}
                width={300}
            />}
            <Lottie options={subFireWorkData}
                height={200}
                width={500}
            />
            <Lottie options={subFireWorkData}
                height={400}
                width={400}
            />
            <Lottie options={mainFireWorkData}
                height={500}
                width={500}
            />
            <Lottie options={thirdFireWorkData}
                height={400}
                width={400}
            />
        </AninimationBox>
    )
};


const themeData = {
    light: {
        bg: 'white',
        title_bg: color.$pink_color,
        border: 'none',
        title_fg: 'white',
        win_fg: color.$default_font_color,
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        title_bg: 'transparent',
        border: `1px solid ${color.$fluorescent_pink_color}`,
        title_fg: color.$fluorescent_pink_color,
        win_fg: color.$fluorescent_yellow_color,
    },
}

const ResultBox = styled.div`
    z-index: 100;
    display:  flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
    background-color: ${({ theme }) => themeData[theme].bg};
    border: ${({ theme }) => themeData[theme].border};

    .title {
        font-size: 20px;
        letter-spacing: 5px;
        text-align: center;
        color: white;
        padding: 5px 0;
        color: ${({ theme }) => themeData[theme].title_fg};
        background-color: ${({ theme }) => themeData[theme].title_bg};
        border-bottom: ${({ theme }) => themeData[theme].border};
    }

    .content {
        box-sizing: border-box;
        padding: 15px;

        .text {
            text-align: center;
            letter-spacing: 3px;
            margin-bottom: 25px;
            color: ${({ theme }) => themeData[theme].win_fg};

            .hint {
                margin-top: 5px;
                letter-spacing: 1px;
                font-size: 12px;
                color: ${color.$unable_font_color};
            }
        }
    }

    .button_area {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100;

        & > button {
            width: 80%;
            & + button {
                margin-top: 10px;
            }
        }
    }
`

const Content = ({ winTeam, isUserWin, openLoadingWindow }) => {
    const theme = useRecoilValue(themeState);
    const userID = useRecoilValue(userIDState);
    const userName = useRecoilValue(userNameState);
    const roomName = useRecoilValue(userRoomState);
    const initModalType = useResetRecoilState(modalState);
    const history = useHistory();
    const roomRef = db.database().ref(`/${roomName}`);
    const buttonColor = {
        light: {
            yellow_button: color.$highlight_color,
            orange_button: color.$orange_color,
            green_button: color.$green_color,
        },
        dark: {
            yellow_button: color.$fluorescent_orange_color,
            orange_button: color.$fluorescent_yellow_color,
            green_button: color.$fluorescent_green_color,
        }
    }

    const teamName = winTeam === 'team1' ? '草莓糕' : '可麗露';

    const backToWaitRoom = () => {
        const toPath = `/${roomName}/waiting_room/${userID}`;
        history.push(toPath);
        initModalType();
        roomRef.child('changeMate').set(true);
    }

    const setReady = async (isReady) => {
        const userInfo = roomRef.child('playersInfo').child(userID);
        await userInfo.update({ ready: isReady });

        if (isReady) {
            await roomRef.child('playersInfo').once("value", async (data) => {
                const playersData = Object.values(data.val());
                const allReady = playersData.filter(data => data.ready).length === 4;
                if (allReady) {
                    await roomRef.child('gameInfo').set({ currentPlayer: userName });
                }
            })
        }
    }

    const readyToNextRound = async () => {
        setReady(true);
        openLoadingWindow();
    }

    const leaveGame = async() => {
        await roomRef.child('playersInfo').child(userID).remove();
        await roomRef.child('someoneLeaveGame').set(true);
        history.push('/');
    }

    return (
        <ResultBox
            theme={theme}
            className="result_box">
            <p className="title">勝負揭曉</p>
            <div className="content">
                <div className="text">
                    {isUserWin
                        ? (
                            <>
                                <p>🎉恭喜<span>{teamName}</span>贏惹🎉</p>
                                <p className="hint">(請享受贏家才有的煙火)</p>
                            </>
                        )
                        : (
                            <>
                                <p>🥲NO～<span>{teamName}</span>贏惹🥲</p>
                                <p className="hint">(別氣餒！努力獲勝就能看煙火！)</p>
                            </>
                        )
                    }
                </div>
                <div className="button_area">
                    <Button
                        onClick={backToWaitRoom}
                        color={buttonColor[theme].yellow_button}>更換隊友</Button>
                    <Button
                        onClick={readyToNextRound}
                        color={buttonColor[theme].orange_button}>再玩一局</Button>
                    <Button
                        onClick={leaveGame}
                        color={buttonColor[theme].green_button}>翻桌不玩</Button>
                </div>
            </div >
        </ResultBox >
    )
};

const ModalResult = ({ winTeam, openLoadingWindow }) => {
    const userTeam = useRecoilValue(userTeamState);
    const isUserWin = winTeam === `team${userTeam}`;
    return (
        <Modal
            className="result_modal">
            <Content openLoadingWindow={openLoadingWindow} winTeam={winTeam} isUserWin={isUserWin} />
            {isUserWin && <Animations />}
        </Modal >
    );
}

export default ModalResult