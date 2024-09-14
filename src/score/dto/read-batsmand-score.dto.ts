import { ApiProperty } from '@nestjs/swagger';
import { ReadBatsmanScoreI } from '../interface/internal.interface';

export class ReadBatsmanScoreDto implements ReadBatsmanScoreI {
  @ApiProperty({ description: 'Batsman name' })
  playerName: string;

  @ApiProperty({ description: 'Batsman runs' })
  runs: number;

  @ApiProperty({ description: 'Is on strike' })
  isOnStrike: boolean;

  @ApiProperty({ description: 'Is on field' })
  isOnField: boolean;

  @ApiProperty({ description: 'Player id' })
  playerId: string;
}
