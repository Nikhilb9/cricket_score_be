import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlayerScoreModelI as PlayerScoreModelI } from './interface/score.model.interface';

import { Document } from 'mongoose';

export type PlayerScoreDocument = PlayerScore & Document;

@Schema({ timestamps: true })
export class PlayerScore implements PlayerScoreModelI {
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

  @Prop({ required: false, default: false })
  isOnStrike: boolean;

  @Prop({ required: false, default: false })
  isOnBowling: boolean;

  @Prop({ required: false, default: false })
  isOut: boolean;
}

export const PlayerScoreSchema = SchemaFactory.createForClass(PlayerScore);
