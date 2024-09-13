import { ApiProperty } from '@nestjs/swagger';
import { PlayerI } from '../interface/internal.interface';

export class PlayerDto implements PlayerI {
  @ApiProperty({ description: 'Player id' })
  playerId: string;

  @ApiProperty({ description: 'Player name' })
  playerName: string;
}
