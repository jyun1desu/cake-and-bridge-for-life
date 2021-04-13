import React from 'react';
import { color } from 'style/theme';
import styled from 'styled-components';
import Modal from 'components/Global/Modal';
import Button from 'components/Global/Button';
import Lottie from 'react-lottie';
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

    return(
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
    </AninimationBox>
)};

const ResultBox = styled.div`
    z-index: 100;
    display:  flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;

    .title {
        font-size: 20px;
        letter-spacing: 5px;
        text-align: center;
        color: white;
        padding: 10px 0;
        background-color: ${color.$pink_color};
    }

    .content {
        box-sizing: border-box;
        padding: 20px 15px 15px;

        .text {
            text-align: center;
            letter-spacing: 3px;
            margin-bottom: 25px;

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

const Content = () => (
    <ResultBox className="result_box">
        <p className="title">勝負揭曉</p>
        <div className="content">
            <div className="text">
                <p>👑恭喜<span>可麗露</span>贏惹👑</p>
                <p className="hint">(請享受一下贏家才有的煙火)</p>
                {/* <p>🥲NO～<span>可麗露</span>贏惹🥲</p> */}
                {/* <p className="hint">(別氣餒！努力獲勝就能看煙火！)</p> */}
            </div>
            <div className="button_area">
                <Button color={color.$highlight_color}>更換隊友</Button>
                <Button color={color.$orange_color}>再玩一局</Button>
                <Button color={color.$green_color}>翻桌不玩</Button>
            </div>
        </div >
    </ResultBox >
);

const ModalGiveUp = () => {
    return (
        <Modal
            className="send_email_modal">
            <Content />
            <Animations />
        </Modal >
    );
}

export default ModalGiveUp