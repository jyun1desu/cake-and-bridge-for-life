import { useResetRecoilState } from "recoil";
import { userNameState, userRoomState, userIDState } from 'store/user';
import { modalState } from 'store/modal';
import { userDeckState } from 'store/deck';
import { thisRoundCardsState, trumpState } from 'store/game';
import { playersData } from 'store/players';
import { teamScoresState } from 'store/score';
import { userWinTricksState } from 'store/winTricks';
import {  userPickBindState, nowBindState, userPassState, playersCalledListState } from 'store/bind';


const useInitData = () => {
    const initUserName = useResetRecoilState(userNameState);
	const initUserRoom = useResetRecoilState(userRoomState);
	const initUserID = useResetRecoilState(userIDState);
    const initModalType = useResetRecoilState(modalState);
    const initUserDeck = useResetRecoilState(userDeckState);
    const initScore = useResetRecoilState(teamScoresState);
    const initUserPickBind = useResetRecoilState(userPickBindState);
    const initNowBind = useResetRecoilState(nowBindState);
    const initPassState = useResetRecoilState(userPassState);
    const initRoundCards = useResetRecoilState(thisRoundCardsState);
    const initTrump = useResetRecoilState(trumpState);
    const initCalledList = useResetRecoilState(playersCalledListState);
    const initWinTricks = useResetRecoilState(userWinTricksState);
    const initPlayersData = useResetRecoilState(playersData);

    const initUserData = () => {
        initUserName();
		initUserRoom();
        initUserID();
    }

    const initGameRoomData = () => {
        initUserDeck();
        initModalType();
        initScore();
        initUserPickBind();
        initNowBind();
        initPassState();
        initCalledList();
        initRoundCards();
        initTrump();
        initWinTricks();
    }

    const initGameData = () => {
        initUserData();
        initGameRoomData();
        initPlayersData();
    }

    return [
        {},
        { initGameData, initGameRoomData }
    ]
}

export default useInitData;