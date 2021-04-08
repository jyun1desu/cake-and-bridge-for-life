import React, { useEffect, useState } from 'react';
import newDeck, { isBadLuck } from 'util/deck';
import db from "database";
import { userIndexState } from 'store/user';
import { userDeckState } from 'store/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { playersData, teamArray } from "store/players";
import { userRoomState } from "store/user";

const GameRoom = () => {
    const [toReissue,setReissue] = useState(false);
    const [showModalReissue, setModalReissue] = useState(false);
    const userIndex = useRecoilValue(userIndexState);
    const setUserDeck = useSetRecoilState(userDeckState);
    const roomName = useRecoilValue(userRoomState);
    const roomRef = db.database().ref(`/${roomName}`);

    useEffect(()=>{
        dealDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[setReissue]);

    const dealDeck = async() => {
        const gameInfoRef = roomRef.child('gameInfo');
        if(userIndex === 1 || toReissue){
            await gameInfoRef.update({deck: newDeck});
        };
        gameInfoRef.child('deck').on("value",(data) => {
            const deck = data.val();
            if(deck){
                setUserDeck(deck[userIndex]);
                if(isBadLuck(deck[userIndex])){
                    setModalReissue(true);
                }
                gameInfoRef.child('deck').off();
            }
        })
    }

    return (<div>
        <p>game room</p>
        {showModalReissue && <div>倒牌兒</div>}
    </div>)
}

export default GameRoom;