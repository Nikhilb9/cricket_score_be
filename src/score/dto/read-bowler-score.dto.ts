import { ApiProperty } from '@nestjs/swagger';
import { ReadBowlerScoreI } from '../interface/internal.interface';

export class ReadBowlerScoreDto implements ReadBowlerScoreI {
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

  @ApiProperty({ description: 'Player id' })
  playerId: string;
}
