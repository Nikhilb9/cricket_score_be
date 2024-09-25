// Enum for Event Types in Uppercase
export enum EventTypes {
  RUN = 'RUN',
  EXTRA = 'EXTRA',
  WICKET = 'WICKET',
  NEW_BALL = 'NEW_BALL',
}

// Enum for Ball Status in Uppercase
export enum BallStatus {
  VALID = 'VALID',
  WIDE = 'WIDE',
  NO_BALL = 'NO_BALL',
  BYE = 'BYE',
  LEG_BYE = 'LEG_BYE',
  OVERTHROW = 'OVERTHROW',
  //
  WIDE_RUNS = 'WIDE_RUNS',
  NO_BALL_BYE_RUNS = 'NO_BALL_BYE_RUNS',
  NO_BALL_RUNS = 'NO_BALL_RUNS',
  NO_BALL_LEG_BYE_RUNS = 'NO_BALL_LEG_BYE_RUNS',
  OVERTHROW_RUNS = 'OVERTHROW_RUNS',
}

export enum TeamType {
  'BATTERS' = 'BATTERS',
  'BOWLERS' = 'BOWLERS',
}
