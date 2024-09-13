import { ApiProperty } from '@nestjs/swagger';
import { TeamsI } from '../interface/internal.interface';
import { TeamDto } from './read-team.dto';

export class TeamsDto implements TeamsI {
  @ApiProperty({ description: 'Teams' })
  teams: TeamDto[];
}
