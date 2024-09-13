import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScoreService } from './score.service';
import { TeamsDto } from './dto/read-teams.dto';

@ApiTags('Score')
@Controller('scoring')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @ApiOkResponse({
    status: 200,
    description: 'Teams data',
    type: () => TeamsDto,
  })
  @Get('team')
  async getTeams(): Promise<TeamsDto> {
    return this.scoreService.getTeams();
  }
}
