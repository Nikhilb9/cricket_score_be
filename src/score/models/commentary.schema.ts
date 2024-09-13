import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CommentaryModelI } from './interface/score.model.interface';

import { Document } from 'mongoose';

export type CommentaryDocument = Commentary & Document;

@Schema({ timestamps: true })
export class Commentary implements CommentaryModelI {
  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, default: 0 })
  run: number;
}

export const CommentarySchema = SchemaFactory.createForClass(Commentary);
