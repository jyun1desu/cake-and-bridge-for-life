export enum TeamTypes {
	TeamOne = 'team1',
	TeamTwo = 'team2',
}

export type Team = TeamTypes.TeamOne | TeamTypes.TeamTwo;

export interface PlayerData {
    name: string;
    team: TeamTypes;
    timestamp: number;
    id: string;
    ready?: boolean;
}