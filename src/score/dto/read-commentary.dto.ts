import { ApiProperty } from '@nestjs/swagger';
import { ReadCommentaryI } from '../interface/internal.interface';

export class ReadCommentaryDto implements ReadCommentaryI {
  @ApiProperty({ description: 'Commentaries' })
  comment: string[];
}
