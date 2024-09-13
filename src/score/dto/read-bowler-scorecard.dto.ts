import { ApiProperty } from '@nestjs/swagger';
import { ReadBowlerScorecardI } from '../interface/internal.interface';

export class ReadBowlerScorecardDto implements ReadBowlerScorecardI {
  @ApiProperty({ description: 'Bowler name' })
  playerName: string;

  @ApiProperty({ description: 'Bowler runs' })
  runs: number;

  @ApiProperty({ description: 'Bowler maidens' })
  maidens: number;

  @ApiProperty({ description: 'Bowler overs' })
  overs: number;

  @ApiProperty({ description: 'Bowler is on bowling' })
  isOnBowling: boolean;
}
