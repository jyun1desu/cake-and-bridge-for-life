import React, { useEffect, useState } from 'react';
import db from "database";
import styled from 'styled-components';
import { RouteComponentProps } from "react-router-dom";
import { useRecoilState } from 'recoil';
import NameFillIn from 'components/Global/NameFillIn';
import { FirebaseRoom } from 'types/room';
import { userRoomState } from 'store/user';

type Params = { roomId: string };

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(39deg, #f7cbca 22.22%, #faf7f0 22.22%, #faf7f0 50%, #f7cbca 50%, #f7cbca 72.22%, #faf7f0 72.22%, #faf7f0 100%);
    background-size: 42.90px 34.74px;

    .content {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: center;
        padding: 40px 0 20px;
        box-sizing: border-box;
        background-color: #faf8ece8;
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
            color: white;

            &:first-child {
                font-size: 18px;
                padding: 3px;
                background-color: pink;
                transform: rotate(-1deg);
            }

            &:nth-child(2) {
                z-index: 10;
                font-size: 24px;
                padding: 5px;
                background-color: green;
                transform: rotate(-4deg);
            }
    
            &:last-child {
                font-size: 18px;
                padding: 2px;
                background-color: orange;
                transform: rotate(3deg);
            }
        }
    }

    .decoration {
        margin-bottom: 20px;

        span {
            display: block;
            transform: rotate(90deg);
            color: #f7cbca;
        }
    }

    .players_amount {
        font-size: 13px;
        margin-top: 10px;
    }
`
const InvitePage = ({ match }: RouteComponentProps<Params>) => {
    const roomId = match.params.roomId;
    const [roomName, setRoomName] = useRecoilState(userRoomState);
    const [currentPlayer, setPlayers] = useState<string[]>([]);

    useEffect(() => {
        const getRoom = () => {
            const roomRef = db.database().ref("/").child(roomId);
            roomRef.on('value', d => {
                const roomData = d.val() as FirebaseRoom;
                const currentPlayers = Object.values(roomData.playersInfo).map(p => p.player)
                setPlayers([...currentPlayers, 'jyunyi'])
                setRoomName(roomData.roomName);
            })
        }
        getRoom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const enterGame = () => {
        console.log('enter waiting room');
    }

    return (
        <Page className="invite_page">
            <section className="content">
                <div className="invite_content">
                    <span>來自</span>
                    <span>{roomName}</span>
                    <span>的橋牌戰帖</span>
                </div>
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
                <p className="players_amount">🍰 {
                    currentPlayer.length > 1
                        ? `${currentPlayer[0]} 跟其他 ${currentPlayer.length - 1} 位玩家`
                        : currentPlayer[0]
                }已經加入 🍰</p>
            </section>
        </Page>
    )
}

export default InvitePage;