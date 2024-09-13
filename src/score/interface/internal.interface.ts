import { TeamType } from '../models/interface/score.model.interface';

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
}
