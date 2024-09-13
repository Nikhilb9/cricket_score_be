import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScoreService } from './score.service';
import { TeamsDto } from './dto';
import { ReadTeamScorecardDto } from './dto/read-team-scorecard.dto';
import { AddScoreEventDto } from './dto/add-score-event.dto';

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

  @ApiOkResponse({ status: 200, description: 'Reset match' })
  @Delete('reset')
  async resetMatch(): Promise<void> {
    return this.scoreService.resetMatch();
  }

  @ApiOkResponse({
    status: 200,
    description: 'Team scorecard',
    type: () => ReadTeamScorecardDto,
  })
  @Get()
  async getScorecard(): Promise<ReadTeamScorecardDto> {
    return this.scoreService.getScore();
  }

  @ApiBody({ type: () => AddScoreEventDto })
  @Post()
  async addScore(@Body() data: AddScoreEventDto): Promise<{ message: string }> {
    return await this.scoreService.addScore(data);
  }
}
