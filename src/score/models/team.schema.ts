import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TeamModelI, TeamType } from './interface/score.model.interface';

import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema({ timestamps: true })
export class Team implements TeamModelI {
  @Prop({ required: true })
  teamName: string;

  @Prop({ required: true })
  teamType: TeamType;

  [x: string]: any;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
