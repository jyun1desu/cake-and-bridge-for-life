import React from "react";
import { useHistory } from "react-router-dom";
import db from "database";
import { child, ref, set, remove } from "firebase/database";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import ModalBinding from "components/GameRoom/Modal/ModalBinding";
import ModalGiveUp from "components/GameRoom/Modal/ModalGiveUp";
import ModalResult from "components/GameRoom/Modal/ModalResult";
import ModalConfirm from "components/Global/molecules/ModalConfirm";
import Loading from "components/Global/molecules/Loading";
import { trumpState, isGameEndState } from "store/game";
import { userRoomState, userIDState } from "store/user";
import { modalState } from "store/modal";
import { OKtoPlay } from "store/deck";
import { ReadyTypes, GameStatusTypes } from "types/types";
import useUserReadyStatus from "util/hook/useUserReadyStatus";

import Kanahei from "assets/bumpintowindow.gif";

interface ModalRootProperty {
  initGameData: () => Promise<void>;
}

const ModalRoot = (props: ModalRootProperty) => {
  const { initGameData } = props;
  const history = useHistory();
  const trump = useRecoilValue(trumpState);
  const userID = useRecoilValue(userIDState);
  const roomId = useRecoilValue(userRoomState);
  const isOKtoPlay = useRecoilValue(OKtoPlay);
  const isGotWinner = useRecoilValue(isGameEndState);
  const [modalType, setModalType] = useRecoilState(modalState);
  const initModalType = useResetRecoilState(modalState);
  const [{ userReadyStatus }, { setReadyStatus }] = useUserReadyStatus(
    ReadyTypes.OneMoreGame
  );
  const roomRef = ref(db, roomId);
  const eventRef = child(roomRef, "event");

  const backToWaitRoom = () => {
    const toPath = `/w/${roomId}/${userID}`;
    history.push(toPath);
    initGameData();
    initModalType();
    remove(eventRef);
  };

  const leaveGame = async () => {
    await remove(child(roomRef, `playersInfo/${userID}`));
    await set(eventRef, GameStatusTypes.SomeoneLeaveGame);
    history.push("/");
  };

  const refreshGame = async () => {
    await initGameData();
    remove(eventRef);
  };

  const closeModal = () => initModalType();

  return (
    <div className="modal_root">
      <ModalBinding active={!trump && isOKtoPlay} />
      <ModalGiveUp active={!isOKtoPlay} />
      <ModalResult
        setReadyStatus={setReadyStatus}
        active={!!isGotWinner}
        refreshGame={() => refreshGame()}
        openConfirmLeaveModal={() => setModalType("cofirm-leave")}
        winTeam={isGotWinner}
      />
      <ModalConfirm
        active={modalType === "cofirm-leave"}
        className="confirm_leave_modal"
        description="確定要離開嗎？"
        onConfirmText="確定"
        onCancelText="繼續玩"
        imageUrl={Kanahei}
        onConfirm={leaveGame}
        onCancel={closeModal}
      />
      <Loading
        active={modalType === GameStatusTypes.SomeoneLeaveGame}
        type={modalType}
        countdown={3}
        action={backToWaitRoom}
        actionText="回到等待室"
        text="有人離開嚕！"
        noOpacity
		isCountdown
      />
      <Loading
        active={modalType === GameStatusTypes.ChangeMate}
        type={modalType}
        countdown={3}
        action={backToWaitRoom}
        actionText="回到等待室"
        text="有人要換隊友唷！"
        noOpacity
		isCountdown
      />
      <Loading
        active={modalType === GameStatusTypes.Restart}
        type={modalType}
        countdown={3}
        action={() => refreshGame()}
        actionText="重新牌局"
        text="倒牌啦！"
        noOpacity
		isCountdown
      />
      <Loading
        active={userReadyStatus}
        cancelReady={() => setReadyStatus(false)}
      />
    </div>
  );
};

export default ModalRoot;
