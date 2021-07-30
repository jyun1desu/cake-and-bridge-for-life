import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { themeState } from 'store/theme';
import { color } from 'style/theme';
import Modal from 'components/Global/atoms/Modal';

const themeData = {
    light: {
        bg: 'white',
        border: 'none',
        fg: color.$default_font_color,
        yes_button_fg: 'white',
        yes_button_bg: color.$pink_color,
        no_button_fg: 'white',
        no_button_bg: color.$green_color,
    },
    dark: {
        bg: color.$dark_dim_bg_color,
        border: `1px solid ${color.$dark_dim_border_color}`,
        fg: color.$dark_default_font_color,
        yes_button_fg: color.$fluorescent_pink_color,
        yes_button_bg: 'transparent',
        no_button_fg: color.$fluorescent_green_color,
        no_button_bg: 'transparent',
    },
}

const AskBox = styled.div`
    display:  flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    transition: .3s all;
    background-color: ${({ theme }) => theme.bg};
    border: ${({ theme }) => theme.border};

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
            transition: .3s all;
            color: ${({ theme }) => theme.fg};
        }
    }

    .button_area {
        display: flex;
        & > button {
            padding: 8px 0;
            font-size: 15px;
            letter-spacing: 2px;
            flex: 1 1 50%;
            transition: .3s all;

            &:first-child {
                background-color: ${({ theme }) => theme.yes_button_bg};
                color: ${({ theme }) => theme.yes_button_fg};
                border-top: ${({ theme }) => theme.border};
                border-right: ${({ theme }) => theme.border};
            }

            &:last-child {
                background-color: ${({ theme }) => theme.no_button_bg};
                color: ${({ theme }) => theme.no_button_fg};
                border-top: ${({ theme }) => theme.border};
            }
        }
    }
`

interface ContentProperty {
    imageUrl: string;
    description: string;
    onConfirmText: string;
    onCancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}


const Content = (props: ContentProperty) => {
    const { imageUrl, description, onConfirm, onCancel, onConfirmText, onCancelText } = props;
    const [theme] = useRecoilState(themeState);

    return (
        <AskBox theme={themeData[theme]} >
            <div className="content">
                <img alt="icon" className="icon" src={imageUrl}></img>
                <p>{description}</p>
            </div >
            <div className="button_area">
                <button onClick={onConfirm}>{onConfirmText}</button>
                <button onClick={onCancel}>{onCancelText}</button>
            </div>
        </AskBox >
    )
}

interface ModalConfirmProperty extends ContentProperty  {
    className: string;
    active: boolean;
}

const ModalConfirm = (props: ModalConfirmProperty) => {
    const { 
        active,
        className,
        imageUrl,
        description,
        onConfirm,
        onCancel,
        onConfirmText = "確定",
        onCancelText = "取消"
    } = props;
    return (
        <Modal
            active={active}
            className={className}>
            <Content
                imageUrl={imageUrl}
                description={description}
                onConfirmText={onConfirmText}
                onCancelText={onCancelText}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </Modal >
    );
}

export default ModalConfirm