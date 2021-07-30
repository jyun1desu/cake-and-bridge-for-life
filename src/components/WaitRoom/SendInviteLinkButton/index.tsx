import React from "react";
import { useTransition, animated } from "react-spring";
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { themeState } from 'store/theme';
import { userRoomState } from 'store/user';
import ShareIcon from "components/Global/atoms/ShareIcon";
import Button from "components/Global/atoms/Button";
import { color } from 'style/theme';
import { useState } from "react";
import { ThemeTypes } from "types/theme";
import sleep from "util/sleep";

const themeData = {
    light: {
        button_color: '#F0E7CF',
        icon_color: color.$brown_color,
        fg: color.$brown_color,
        modal_color: '#D4EFA8',
    },
    dark: {
        button_color: color.$highlight_color,
        icon_color: color.$highlight_color,
        fg: color.$highlight_color,
        modal_color: color.$fluorescent_green_color,
    },
}

const Toast = styled(animated.div)`
    z-index: 20;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    padding: 10px 0;
    background-color: ${({ theme }) => theme.modal_color};
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
`

interface SuccessToastProperty {
    active: boolean;
    theme: ThemeTypes;
}

const SuccessToast = (props: SuccessToastProperty) => {
    const { active, theme } = props;
    const transitions = useTransition(active, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <>
            {transitions((props, item) => item && (
                <Toast
                    style={props}
                    theme={themeData[theme]}
                >
                    COPIED!
                </Toast>))
            }
        </>
    )
}

const Content = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    span:first-child {
        margin-right: 2px;
    }

    span:last-child {
        font-size: 12px;
        color: ${({ theme }) => theme.fg}
    }
`

interface SendInviteLinkButtonProperty {
    className: string;
}

const SendInviteLinkButton = (props: SendInviteLinkButtonProperty) => {
    const { className } = props;
    const theme = useRecoilValue(themeState);
    const roomId = useRecoilValue(userRoomState);
    const [isCopied, setIsCopied] = useState(false);

    const copyInviteLink = (id: string) => {
        const inviteLink = `https://jyun1desu.github.io/cake-and-bridge-for-life/#/i/${id}`
        navigator.clipboard.writeText(inviteLink).then(async () => {
            setIsCopied(true);
            await sleep(2000);
            setIsCopied(false);
        })
    }

    return (
        <>
            <SuccessToast theme={theme} active={isCopied} />
            <Button
                className={className}
                size="small"
                onClick={() => copyInviteLink(roomId)}
                color={themeData[theme].button_color}
            >
                <Content
                    theme={themeData[theme]}
                    className="button_content"
                >
                    <ShareIcon
                        backgroundColor={theme === ThemeTypes.Light ? themeData[theme].button_color : color.$dark_bg_color}
                        iconColor={themeData[theme].icon_color}
                    />
                    <span>複製邀請連結</span>
                </Content>
            </Button>
        </>
    )
}

export default SendInviteLinkButton