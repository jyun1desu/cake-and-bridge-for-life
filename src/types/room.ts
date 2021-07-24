
import { PlayerData } from './player'; 

export type PlayersInfo = {
    [key: string]: PlayerData
}

export interface FirebaseRoom {
    timestamp: number;
    roomName:  string;
    playersInfo: PlayersInfo;
    changeMate?: boolean;
    someoneLeaveGame?: boolean;
    restart?: boolean;
    oneMoreGame?: boolean;
}

export interface Room extends FirebaseRoom  {
    roomID: string;
}

export type FirebaseRoomsData = {
    [key: string]: FirebaseRoom
}

export type RoomList = Room[];