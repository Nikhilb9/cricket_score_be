import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TeamScoreModelI } from './interface/score.model.interface';
import { Document } from 'mongoose';

export type TeamScoreDocument = TeamScore & Document;

@Schema({ timestamps: true })
export class TeamScore implements TeamScoreModelI {
  @Prop({ required: true })
  bowlersTeamName: string;

  @Prop({ required: true })
  batsmanTeamName: string;

  @Prop({ required: false, default: 0 })
  runs: number;

  @Prop({ required: false, default: 0 })
  wicket: number;

  @Prop({ required: true, default: 0 })
  balls: number;

  @Prop({ required: true, default: 0 })
  overs: number;

  @Prop({ required: false, default: 0 })
  wide: number;

  @Prop({ required: false, default: 0 })
  noBall: number;

  @Prop({ required: false, default: 0 })
  bye: number;

  @Prop({ required: false, default: 0 })
  legBye: number;

  @Prop({ required: false, default: 0 })
  overthrow: number;

  @Prop({ required: true, default: 0 })
  totalExtras: number;

  @Prop({ required: true, default: 10 })
  overCapacity: number;
}

export const TeamScoreSchema = SchemaFactory.createForClass(TeamScore);
