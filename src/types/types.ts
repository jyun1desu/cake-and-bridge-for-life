export enum ReadyTypes {
	EnterGame = 'enterGame',
	OneMoreGame = 'oneMoreGame',
}

export enum GameStatusTypes {
	EnterGame = 'enterGame',
	OneMoreGame = 'oneMoreGame',
	ChangeMate = 'changeMate',
	SomeoneLeaveGame = 'someoneLeaveGame',
	Restart = 'restart',
}

export type RefreshGameTypes = GameStatusTypes.Restart | GameStatusTypes.OneMoreGame;

export enum NavigatorTypes {
	WonTricks = 'wintricks',
	Settings = 'settings',
}