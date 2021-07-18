export enum TeamTypes {
	TeamOne = 'team1',
	TeamTwo = 'team2',
}

export type Team = TeamTypes.TeamOne | TeamTypes.TeamTwo;

export interface PlayerData {
    player: string;
    team: Team;
    timestamp: number;
    userID: string;
    ready?: boolean;
}