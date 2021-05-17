import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { themeState } from 'store/theme';
import { userTeamState } from 'store/user';
import { color } from 'style/theme';
import Modal from 'components/Global/Modal';
import Button from 'components/Global/Button';
import mainFireWork from 'assets/16764-firework-animaiton.json'
import subFireWork from 'assets/14438-fireworks.json'

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
            top: -20px;
        }
        &:nth-child(2) {
            position: absolute;
            left: 30px;
            top: 100px;
        }
        &:nth-child(3) {
            position: absolute;
            left: -150px;
            top: 300px;
        }
        &:nth-child(4) {
            position: absolute;
            left: 100px;
            top: 450px;
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
            left: -50%;
            bottom: 10%;
        }
    }
`

const Animations = () => {
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

    return (
        <AninimationBox>
            <Lottie options={mainFireWorkData}
                height={300}
                width={400}
            />
            <Lottie options={mainFireWorkData}
                height={300}
                width={600}
            />
            <Lottie options={mainFireWorkData}
                height={500}
                width={500}
            />
            <Lottie options={mainFireWorkData}
                height={300}
                width={300}
            />
            <Lottie options={subFireWorkData}
                height={300}
                width={300}
            />
            <Lottie options={subFireWorkData}
                height={300}
                width={300}
            />
            <Lottie options={subFireWorkData}
                height={200}
                width={500}
            />
            <Lottie options={subFireWorkData}
                height={200}
                width={400}
            />
            <Lottie options={subFireWorkData}
                height={300}
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

const Content = ({ winTeam, isUserWin }) => {
    const theme = useRecoilValue(themeState);
    const buttonColor = {
        light: {
            button1: color.$highlight_color,
            button2: color.$orange_color,
            button3: color.$green_color,
        },
        dark: {
            button1: color.$fluorescent_orange_color,
            button2: color.$fluorescent_yellow_color,
            button3: color.$fluorescent_green_color,
        }
    }
    const teamName = winTeam === 'team1' ? '草莓糕' : '可麗露';

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
                        color={buttonColor[theme].button1}>更換隊友</Button>
                    <Button
                        color={buttonColor[theme].button2}>再玩一局</Button>
                    <Button
                        color={buttonColor[theme].button3}>翻桌不玩</Button>
                </div>
            </div >
        </ResultBox >
    )
};

const ModalResult = ({ winTeam }) => {
    const userTeam = useRecoilValue(userTeamState);
    const isUserWin = winTeam === `team${userTeam}`;
    console.log(winTeam)
    console.log(userTeam)
    return (
        <Modal
            className="result_modal">
            <Content winTeam={winTeam} isUserWin={isUserWin} />
            {isUserWin && <Animations />}
        </Modal >
    );
}

export default ModalResult