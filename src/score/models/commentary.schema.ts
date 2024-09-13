import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CommentaryModelI,
  CommentType,
} from './interface/score.model.interface';

import { HydratedDocument } from 'mongoose';

export type CommentaryDocument = HydratedDocument<Commentary>;

@Schema({ timestamps: true })
export class Commentary implements CommentaryModelI {
  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, type: () => CommentType })
  commentType: CommentType;

  @Prop({ required: true, default: 0 })
  run: number;
}

export const CommentarySchema = SchemaFactory.createForClass(Commentary);
