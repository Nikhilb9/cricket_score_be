import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlayerModelI } from './interface/score.model.interface';

import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema({ timestamps: true })
export class Player implements PlayerModelI {
  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true })
  teamId: string;

  [x: string]: any;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
