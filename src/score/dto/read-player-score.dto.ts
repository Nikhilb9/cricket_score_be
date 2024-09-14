import { ApiProperty } from '@nestjs/swagger';
import { ReadPlayerScoreI } from '../interface/internal.interface';
import { ReadBatsmanScoreDto } from './read-batsmand-score.dto';
import { ReadBowlerScoreDto } from './read-bowler-score.dto';

export class ReadPlayerScoreDto implements ReadPlayerScoreI {
  @ApiProperty({
    description: 'Batsman score',
    type: () => [ReadBatsmanScoreDto],
  })
  batsman: ReadBatsmanScoreDto[];

  @ApiProperty({
    description: 'Bowler score',
    type: () => [ReadBowlerScoreDto],
  })
  bowler: ReadBowlerScoreDto[];
}
