import { ApiProperty } from '@nestjs/swagger';
import { ReadPlayerScorecardI } from '../interface/internal.interface';
import { ReadBatsmanScorecardDto } from './read-batsmand-scorecard.dto';
import { ReadBowlerScorecardDto } from './read-bowler-scorecard.dto';

export class ReadPlayerScorecardDto implements ReadPlayerScorecardI {
  @ApiProperty({
    description: 'Batsman scorecard',
    type: () => [ReadBatsmanScorecardDto],
  })
  batsman: ReadBatsmanScorecardDto[];

  @ApiProperty({
    description: 'Bowler scorecard',
    type: () => [ReadBowlerScorecardDto],
  })
  bowler: ReadBowlerScorecardDto[];
}
