import { ApiProperty } from '@nestjs/swagger';
import { TeamI } from '../interface/internal.interface';
import { PlayerDto } from './read-player.dto';
import { TeamType } from '../models/interface/score.model.interface';

export class TeamDto implements TeamI {
  @ApiProperty({ description: 'Team Id' })
  teamId: string;

  @ApiProperty({ description: 'Team Name' })
  teamName: string;

  @ApiProperty({ description: 'Team Players', type: () => [PlayerDto] })
  players: PlayerDto[];

  @ApiProperty({ description: 'Team Type', enum: TeamType })
  teamType: TeamType;
}
