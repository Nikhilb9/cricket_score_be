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

export interface ReadTeamScoreI {
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
  readonly playerScore: ReadPlayerScoreI;
}

export interface ReadCommentaryI {
  readonly comment: string[];
}

export interface ReadBowlerScoreI {
  readonly playerName: string;
  readonly runs: number;
  readonly maidens: number;
  readonly overs: number;
  readonly playerId: string;
}

export interface ReadPlayerScoreI {
  readonly batsman: ReadBatsmanScoreI[];
  readonly bowler: ReadBowlerScoreI[];
}
export interface ReadBatsmanScoreI {
  readonly playerName: string;
  readonly runs: number;
  readonly isOnStrike: boolean;
  readonly isOnField: boolean;
  readonly playerId: string;
}

export interface UpdateTeamScore {
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

export interface UpdatePlayerScore {
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
  isOut?: boolean;
}

export interface GetPlayerScoreI {
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
  isOut?: boolean;
}

export interface GetTeamScoreI {
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
