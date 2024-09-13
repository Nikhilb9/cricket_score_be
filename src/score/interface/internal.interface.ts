import { BallStatus, EventTypes, TeamType } from '../enum/enum';
import { Types } from 'mongoose';
export interface TeamI {
  readonly teamId: string;
  readonly teamName: string;
  readonly players: PlayerI[];
  readonly teamType: TeamType;
}

export interface PlayerI {
  readonly playerId: string;
  readonly playerName: string;
}

export interface TeamsI {
  readonly teams: TeamI[];
}

export interface ReadTeamScorecardI {
  readonly bowlersTeamName: string;
  readonly batsmanTeamName: string;
  readonly runs: number;
  readonly wickets: number;
  readonly balls: number;
  readonly overs: number;
  readonly wide: number;
  readonly noBall: number;
  readonly legBye: number;
  readonly bye: number;
  readonly extras: number;
  readonly overthrow: number;
  readonly commentaries: ReadCommentaryI;
  readonly playerScorecard: ReadPlayerScorecardI;
}

export interface ReadCommentaryI {
  readonly comment: string[];
}

export interface ReadBowlerScorecardI {
  readonly playerName: string;
  readonly runs: number;
  readonly maidens: number;
  readonly overs: number;
}

export interface ReadPlayerScorecardI {
  readonly batsman: ReadBatsmanScorecardI[];
  readonly bowler: ReadBowlerScorecardI[];
}
export interface ReadBatsmanScorecardI {
  readonly playerName: string;
  readonly runs: number;
  readonly isOnStrike: boolean;
  readonly isOnField: boolean;
}

export interface UpdateTeamScorecard {
  bowlersTeamName?: string;
  batsmanTeamName?: string;
  runs?: number;
  wicket?: number;
  balls?: number;
  overs?: number;
  wide?: number;
  noBall?: number;
  bye?: number;
  legBye?: number;
  overthrow?: number;
  totalExtras?: number;
  overCapacity?: number;
}

export interface UpdatePlayerScorecard {
  playerId?: string;
  runs?: number;
  playerName?: string;
  isOnStrike?: boolean;
  isOnBowling?: boolean;
  isOnField?: boolean;
  extras?: number;
  overs?: number;
  isBatsman?: boolean;
  isBowler?: boolean;
  currentBall?: number;
  maidens?: number;
}

export interface GetPlayerScorecardI {
  _id: Types.ObjectId;
  playerId: string;
  runs: number;
  playerName: string;
  isOnStrike?: boolean;
  isOnBowling?: boolean;
  isOnField?: boolean;
  extras?: number;
  overs?: number;
  isBatsman?: boolean;
  isBowler?: boolean;
  currentBall?: number;
  maidens?: number;
}

export interface GetTeamScorecardI {
  _id: Types.ObjectId;
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
  overCapacity: number;
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

export interface GetTeamI {
  _id?: Types.ObjectId;
  teamName: string;
  teamType: TeamType;
}
