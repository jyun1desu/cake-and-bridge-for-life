import db from "database";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userNameState, userRoomState, userIDState } from "store/user";
import { PlayerData } from 'types/player';
import { ReadyTypes } from 'types/ready';

type Values = {
    userReadyStatus: boolean
}

type Handlers = {
    setReadyStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUserReadyStatus = (type: ReadyTypes): [Values, Handlers] => {
    const [readyStatus, setReadyStatus] = useState(false);
    const userId = useRecoilValue(userIDState);
    const userName = useRecoilValue(userNameState);
    const roomId = useRecoilValue(userRoomState);

    useEffect(()=>{
        const setReady = async (isReady: boolean, type: ReadyTypes) => {
            const roomRef = db.database().ref(`/${roomId}`);
            const userInfo = roomRef.child('playersInfo').child(userId);
            await userInfo.update({ ready: isReady });
    
            if (isReady) {
                await roomRef.child('playersInfo').once("value", async (data) => {
                    const playersData = Object.values(data.val()) as PlayerData[];
                    const allReady = playersData.filter(data => data.ready).length === 4;
                    if (allReady) {
                        await roomRef.child('currentPlayer').set(userName);
                        await roomRef.child(type).set(true);
                        roomRef.child('playersInfo').off();
                    }
                })
            }
        }

        setReady(readyStatus, type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[readyStatus, type])

    return [
        { userReadyStatus: readyStatus},
        { setReadyStatus }
    ]
}

export default useUserReadyStatus;
