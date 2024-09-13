import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TeamScorecardModelI } from './interface/score.model.interface';

import { HydratedDocument } from 'mongoose';

export type TeamScorecardDocument = HydratedDocument<TeamScorecard>;

@Schema({ timestamps: true })
export class TeamScorecard implements TeamScorecardModelI {
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

export const TeamScorecardSchema = SchemaFactory.createForClass(TeamScorecard);
