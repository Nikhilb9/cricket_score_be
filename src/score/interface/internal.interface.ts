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
