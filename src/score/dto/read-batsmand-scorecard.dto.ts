import { ApiProperty } from '@nestjs/swagger';
import { ReadBatsmanScorecardI } from '../interface/internal.interface';

export class ReadBatsmanScorecardDto implements ReadBatsmanScorecardI {
  @ApiProperty({ description: 'Batsman name' })
  playerName: string;

  @ApiProperty({ description: 'Batsman runs' })
  runs: number;
}
