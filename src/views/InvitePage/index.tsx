import React, { useEffect, useState } from 'react';
import db from "database";
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import NameFillIn from 'components/Global/NameFillIn';
import Button from "components/Global/Button";
import { FirebaseRoom } from 'types/room';
import { ThemeTypes } from 'types/theme';
import { themeState } from 'store/theme';
import { color } from 'style/theme'
import useFirebaseRoom from "util/hook/useFirebaseRoom";

type Params = { roomId: string };

const themeData = {
    light: {
        stripes_1: '#f7cbca',
        stripes_2: '#faf7f0',
        content_bg: '#faf8ece8',
        decoration_arrows: '#f7cbca',
        title_block_1: color.$highlight_color,
        title_block_2: color.$green_color,
        title_block_3: color.$orange_color,
        title_fg: 'white',
        button_color: '#f7cbca',
        fg: color.$default_font_color,
    },
    dark: {
        stripes_1: '#151615',
        stripes_2: '#1F211F',
        content_bg: color.$dark_dim_bg_color,
        decoration_arrows: color.$fluorescent_yellow_color,
        title_block_1: color.$fluorescent_orange_color,
        title_block_2: color.$fluorescent_green_color,
        title_block_3: color.$fluorescent_yellow_color,
        title_fg: color.$default_font_color,
        button_color: color.$fluorescent_pink_color,
        fg: color.$dark_default_font_color,
    },
}

interface PageProperty {
    themeType: ThemeTypes;
}

const Page = styled.div<PageProperty>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: 
        linear-gradient(39deg, 
            ${({ theme }) => theme.stripes_1} 22.22%, 
            ${({ theme }) => theme.stripes_2} 22.22%, 
            ${({ theme }) => theme.stripes_2} 50%, 
            ${({ theme }) => theme.stripes_1} 50%, 
            ${({ theme }) => theme.stripes_1} 72.22%, 
            ${({ theme }) => theme.stripes_2} 72.22%, 
            ${({ theme }) => theme.stripes_2} 100%);
    background-size: 42.90px 34.74px;

    .content {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: center;
        padding: 40px 0 20px;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.content_bg};
        border: 1px solid ${color.$fluorescent_pink_color};
        border-radius: 10px;
        position: relative;
    }

    .invite_content {
        position: absolute;
        top: 0;
        transform: translateY(-50%);

        span {
            display: inline-block;
            position: relative;
            color: ${({ theme }) => theme.title_fg};

            &:first-child {
                font-size: 16px;
                padding: 3px;
                background-color: ${({ theme }) => theme.title_block_1};
                transform: rotate(-1deg);
            }

            &:nth-child(2) {
                z-index: 10;
                font-size: 26px;
                padding: 5px;
                background-color: ${({ theme }) => theme.title_block_2};
                transform: rotate(-4deg);
            }
    
            &:last-child {
                font-size: 18px;
                padding: 2px;
                background-color: ${({ theme }) => theme.title_block_3};
                transform: rotate(3deg);
            }
        }
    }

    .decoration {
        margin-bottom: 20px;

        span {
            display: block;
            transform: rotate(90deg);
            color: ${({ theme }) => theme.decoration_arrows};
        }
    }

    .players_amount {
        font-size: 13px;
        margin-top: 10px;
        color: ${({ theme }) => theme.fg};
    }

    .unable_content {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            color: ${({ theme }) => theme.fg};
        }

        button {
            margin-top: 10px;
        }
    }
`
const InvitePage = ({ match }: RouteComponentProps<Params>) => {
    const roomId = match.params.roomId;
    const theme = useRecoilValue(themeState);
    const { push } = useHistory();
    const [, { updateDbRoomData }] = useFirebaseRoom();
    const [roomName, setRoomName] = useState('');
    const [currentPlayer, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        const getRoom = () => {
            const roomRef = db.database().ref("/").child(roomId);
            roomRef.on('value', d => {
                const roomData = d.val() as FirebaseRoom | null;
                if (!roomData) {
                    push('/');
                    return;
                }
                const currentPlayers = Object.values(roomData.playersInfo).map(p => p.name);
                setRoomName(roomData.roomName);
                setPlayers([...currentPlayers])
            })
        }
        getRoom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);

    const enterGame = () => {
        updateDbRoomData(roomId);
    };

    return (
        <Page
            theme={themeData[theme]}
            themeType={theme}
            className="invite_page"
        >
            <section className="content">
                <div className="invite_content">
                    <span>來自</span>
                    <span>{roomName}</span>
                    <span>的橋牌戰帖</span>
                </div>
                {currentPlayer.length > 3 ? (
                    <div className="unable_content">
                        <p>🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯</p>
                        <p>遲來一歩！已經客滿了</p>
                        <p>🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯</p>
                        <Button
                            className="back_to_home_button"
                            color={themeData[theme].button_color}
                            onClick={() => { push('/') }}
                            type="button"
                        >
                            回到首頁
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="decoration">
                            <span>&#62;</span>
                            <span>&#62;</span>
                            <span>&#62;</span>
                        </div>
                        <NameFillIn
                            actionText="立即加入戰局"
                            buttonText="GO"
                            onEnter={enterGame}
                        />
                        <p className="players_amount">🍰
                            {currentPlayer[0]}
                            {currentPlayer.length > 1 && ` 跟其他 ${currentPlayer.length - 1} 位橋牌友`}
                            已經加入 🍰
                        </p>
                    </>
                )}
            </section>
        </Page>
    )
}

export default InvitePage;