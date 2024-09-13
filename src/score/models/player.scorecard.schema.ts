import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlayerScorecardModelI } from './interface/score.model.interface';

import { HydratedDocument } from 'mongoose';

export type PlayerScorecardDocument = HydratedDocument<PlayerScorecard>;

@Schema({ timestamps: true })
export class PlayerScorecard implements PlayerScorecardModelI {
  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true, default: 0 })
  runs: number;

  @Prop({ required: false, default: false })
  isOnField: boolean;

  @Prop({ required: false, default: 0 })
  extras: number;

  @Prop({ required: false, default: 0 })
  overs: number;

  @Prop({ required: false, default: false })
  isBatsman: boolean;

  @Prop({ required: false, default: 0 })
  currentBall: number;

  @Prop({ required: false, default: 0 })
  maidens: number;

  @Prop({ required: false, default: false })
  isBowler: boolean;
}

export const PlayerScorecardSchema =
  SchemaFactory.createForClass(PlayerScorecard);
