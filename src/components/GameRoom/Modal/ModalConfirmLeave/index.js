import React from 'react';
import { color } from 'style/theme';
import styled from 'styled-components';
import Modal from 'components/Global/Modal';
import Kanahei from 'assets/bumpintowindow.gif';


const AskBox = styled.div`
    display:  flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
    overflow: hidden;

    .title {
        padding: 10px 0;
        text-align: center;
        letter-spacing: 1px;
        color: white;
        background-color: ${color.$pink_color};
    }

    .content {
        display:  flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 15px 15px;

        img {
        width: 80px;
        margin-bottom: 20px;
        }

        p {
            letter-spacing: 1px;
        }
    }

    .button_area {
        display: flex;
        & > button {
            padding: 8px 0;
            font-size: 15px;
            letter-spacing: 2px;
            flex: 1 1 50%;
            color: white;

            &:first-child {
                background-color: ${color.$pink_color};
            }

            &:last-child {
                background-color: ${color.$green_color};
            }
        }
    }
`

const Content = () => {
    return (
        <AskBox>
            <div className="content">
                <img alt="celebrate-icon" className="icon" src={Kanahei}></img>
                <p>確定要離開嗎？</p>
            </div >
            <div className="button_area">
                <button>離開</button>
                <button>繼續玩</button>
            </div>
        </AskBox >
    )
}

const ModalConfirmLeave = () => {
    return (
        <Modal
            className="confirm_leave_modal">
            <Content />
        </Modal >
    );
}

export default ModalConfirmLeave