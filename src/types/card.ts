export enum CardSuitType {
	Spade = 'spade',
	Heart = 'heart',
	Diamond = 'diamond',
	Club = 'club',
}

export enum SuitColorType {
	Red = 'red',
	Black = 'black',
}

export type SuitColor =  SuitColorType.Black | SuitColorType.Red;

export type Suits = CardSuitType.Spade | CardSuitType.Heart | CardSuitType.Diamond | CardSuitType.Club;

export type OtherPlayerDeck = {
	[key: string]: number;
}

export interface Card {
	suit: CardSuitType;
	number: number;
}