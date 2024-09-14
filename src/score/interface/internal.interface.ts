import { BallStatus, EventTypes, TeamType } from '../enum/enum';
import { Types } from 'mongoose';
export interface TeamI {
  teamId: string;
  teamName: string;
  players: PlayerI[];
  teamType: TeamType;
}

export interface PlayerI {
  playerId: string;
  playerName: string;
}

export interface TeamsI {
  teams: TeamI[];
}

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
