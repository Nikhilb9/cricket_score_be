import { ApiProperty } from '@nestjs/swagger';
import { PlayerI } from '../interface/internal.interface';

export class PlayerDto implements PlayerI {
  @ApiProperty({ description: 'Player id', required: true })
  playerId: string;

  @ApiProperty({ description: 'Player name', required: true })
  playerName: string;
}
