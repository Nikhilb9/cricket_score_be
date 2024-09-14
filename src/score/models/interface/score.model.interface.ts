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
