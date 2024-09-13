export interface PlayerModelI {
  playerName: string;
  teamId: string;
}

export interface TeamModelI {
  teamName: string;
  teamType: TeamType;
}

export enum TeamType {
  'BATTERS' = 'BATTERS',
  'BOWLERS' = 'BOWLERS',
}
