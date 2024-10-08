import { BallStatus, EventTypes } from '../enum/enum';

export interface ReadTeamScoreI {
  bowlersTeamName: string;
  batsmanTeamName: string;
  runs: number;
  wickets: number;
  balls: number;
  overs: number;
  wide: number;
  noBall: number;
  legBye: number;
  bye: number;
  extras: number;
  overthrow: number;
  commentaries: ReadCommentaryI;
  playerScore: ReadPlayerScoreI;
}

export interface ReadCommentaryI {
  comment: string[];
}

export interface ReadBowlerScoreI {
  playerName: string;
  runs: number;
  maidens: number;
  overs: number;
  playerId: string;
}

export interface ReadPlayerScoreI {
  batsman: ReadBatsmanScoreI[];
  bowler: ReadBowlerScoreI[];
}
export interface ReadBatsmanScoreI {
  playerName: string;
  runs: number;
  isOnStrike: boolean;
  isOnField: boolean;
  playerId: string;
}

export interface ExtrasRuns {
  noBall: number;
  wide: number;
  bye: number;
  legBye: number;
  overthrow: number;
}

export interface Team {
  totalRuns: number;
  balls: number;
}

export interface GetCommentaryI {
  comment: string;
  createdAt: string;
}

export interface Extras {
  batsman: BatsmanBowler;
  bowler: BatsmanBowler;
  team: Team;
  extras: ExtrasRuns;
}

export interface BatsmanBowler {
  runs: number;
  balls: number;
}

export interface AddScoreEventI {
  event: EventTypes;
  runValue: number;
  ballStatus: BallStatus;
  isWicket: boolean;
  newBall: boolean;
  batsmanId: string;
  bowlerId: string;
}
