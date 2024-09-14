import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScoreService } from './score.service';
import { TeamsDto } from './dto';
import { ReadTeamScoreDto } from './dto/read-team-score.dto';
import { AddScoreEventDto } from './dto/add-score-event.dto';

@ApiTags('Cricket Match')
@Controller('cricket/match')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @ApiOkResponse({
    status: 200,
    description: 'Teams data',
    type: () => TeamsDto,
  })
  @Get('teams')
  async getTeams(): Promise<TeamsDto> {
    return this.scoreService.getTeams();
  }

  @ApiOkResponse({ status: 200, description: 'Reset match' })
  @Delete('reset')
  async resetMatch(): Promise<void> {
    return this.scoreService.resetMatch();
  }

  @ApiOkResponse({
    status: 200,
    description: 'Team score',
    type: () => ReadTeamScoreDto,
  })
  @Get('score')
  async getScore(): Promise<ReadTeamScoreDto> {
    return this.scoreService.getScore();
  }

  @ApiBody({ type: AddScoreEventDto })
  @Post('score')
  async addScore(@Body() data: AddScoreEventDto): Promise<{ message: string }> {
    return await this.scoreService.addScore(data);
  }
}
