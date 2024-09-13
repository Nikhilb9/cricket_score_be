export interface PlayerModelI {
  playerName: string;
  teamId: string;
}

export interface TeamModelI {
  teamName: string;
  teamType: TeamType;
}

export interface CommentaryModelI {
  comment: string;
  run: number;
  commentType: CommentType;
}

export interface PlayerScorecardModelI {
  playerId: string;
  runs: number;
  playerName: string;
  isOnField?: boolean;
  extras?: number;
  overs?: number;
  isBatsman?: boolean;
  isBowler?: boolean;
  currentBall?: number;
  maidens?: number;
}

export interface TeamScorecardModelI {
  bowlersTeamName: string;
  batsmanTeamName: string;
  runs: number;
  wicket: number;
  balls: number;
  overs: number;
  wide: number;
  noBall: number;
  bye: number;
  legBye: number;
  overthrow: number;
  totalExtras: number;
}

export enum TeamType {
  'BATTERS' = 'BATTERS',
  'BOWLERS' = 'BOWLERS',
}

// Extras added not added in batsman run =  but will be added to bowler and team
export enum CommentType {
  WIDE = 'WIDE', // Extras
  RUNNING = 'RUNNING',
  NO_BALL = 'NO_BALL', // Extras
  WICKET = 'WICKET',
  BYE = 'BYE', // Extras
  LEG_BYE = 'LEG_BYE', // Extras
  SIX = 'SIX',
  FOUR = 'FOUR',
  RUN_OVERTHROW = 'RUN_OVERTHROW', // Extras
  NO_BALL_LEG_BYE = 'NO_BALL_LEG_BYE', // Extras
  NO_BALL_BYE = 'NO_BALL_BYE', // Extras
  NO_BALL_RUN = 'NO_BALL_RUN', // Extras 1 = Other to batsman
  WIDE_RUN = 'WIDE_RUN', // Extras
}
