import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScoreService } from './score.service';
import { TeamsDto } from './dto/read-teams.dto';

@ApiTags('Score')
@Controller('scoring')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}
  // @Get()
  // async getPlayersScore() {}

  // @Get()
  // async getBallCommentary() {}

  // @Get()
  // async getTeamScore() {}

  // @Post()
  // async addScore() {}

  @Get('team')
  async getTeams(): Promise<TeamsDto> {
    return this.scoreService.getTeams();
  }
}
