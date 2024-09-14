import { TeamType } from '../../enum/enum';
import { Types } from 'mongoose';
export interface CommentaryModelI {
  comment: string;
  run: number;
}

export interface PlayerScoreModelI {
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

export interface TeamScoreModelI {
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

export interface GetTeamI {
  _id?: Types.ObjectId;
  teamName: string;
  teamType: TeamType;
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
