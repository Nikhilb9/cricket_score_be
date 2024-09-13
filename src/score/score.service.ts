import { Injectable } from '@nestjs/common';
import { ScoreRepositoryService } from './score.repository.service';
import { TeamsDto } from './dto/read-teams.dto';
import { ReadTeamScorecardDto } from './dto/read-team-scorecard.dto';
import {
  Commentary,
  CommentaryDocument,
  PlayerScorecard,
  PlayerScorecardDocument,
  TeamScorecard,
  TeamScorecardDocument,
} from './models';
import { ReadBatsmanScorecardDto } from './dto/read-batsmand-scorecard.dto';
import { ReadBowlerScorecardDto } from './dto/read-bowler-scorecard.dto';
import { ReadCommentaryI } from './interface/internal.interface';
import { EventTypes } from './enum/enum';
import { AddScoreEventDto } from './dto/add-score-event.dto';
import { teamPlayers } from './team-player';
@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepositoryService: ScoreRepositoryService,
  ) {}

  async getTeams(): Promise<TeamsDto> {
    return { teams: teamPlayers.teams };
  }

  async getScore(): Promise<ReadTeamScorecardDto> {
    const [commentaries, batsmanScorecard, bowlerScorecard, teamScorecard] =
      (await Promise.all([
        this.scoreRepositoryService.getCommentary(),
        this.scoreRepositoryService.getPlayerScoreCard(true),
        this.scoreRepositoryService.getPlayerScoreCard(false),
        this.scoreRepositoryService.getTeamScoreCard(),
      ])) as [
        CommentaryDocument[],
        PlayerScorecardDocument[],
        PlayerScorecardDocument[],
        TeamScorecardDocument[],
      ];

    return this.teamScorecardDataTransform(
      teamScorecard[0],
      commentaries,
      batsmanScorecard,
      bowlerScorecard,
    );
  }

  async resetMatch(): Promise<void> {
    await Promise.all([
      this.scoreRepositoryService.deleteAllCommentaries(),
      this.scoreRepositoryService.deleteAllMatch(),
      this.scoreRepositoryService.deleteAllPlayerScorecard(),
    ]);
  }

  async addScore(data: AddScoreEventDto): Promise<{ message: string }> {
    if (data.event === EventTypes.RUN) {
      await this.addRun(data);
    }

    if (data.event === EventTypes.EXTRA) {
      await this.addExtra(data);
    }

    if (data.event === EventTypes.WICKET) {
      await this.addWicket(data);
    }

    if (data.event === EventTypes.NEW_BALL) {
      await this.changeBowler(data);
    }
    return {
      message: 'Cricket event received successfully!',
    };
  }

  private async addRun(data: AddScoreEventDto): Promise<void> {
    const { runValue, bowlerId, batsmanId } = data;
    console.log(bowlerId, batsmanId);
    // const teams: Team[] = await this.scoreRepositoryService.getAllTeams();
    const teamScore = await this.scoreRepositoryService.getTeamScoreCard();

    // await this.scoreRepositoryService.updatePlayerScoreCard();

    // await this.scoreRepositoryService.updatePlayerScoreCard();

    await this.scoreRepositoryService.updateTeamScorecard(
      {
        runs: teamScore[0].runs + runValue,
        balls: teamScore[0].balls + 1,
      },
      teamScore[0]._id.toString(),
    );
  }

  private async addExtra(data: AddScoreEventDto): Promise<void> {
    // const {
    //   runValue,
    //   ballStatus,
    //   bowlerTeamId,
    //   batsmanTeamId,
    //   batsmanId,
    //   bowlerId,
    // } = data;
    console.log(data);
  }

  private async addWicket(data: AddScoreEventDto): Promise<void> {
    // const { bowlerId, bowlerTeamId, batsmanId, batsmanTeamId } = data;
    console.log(data);
  }

  private async changeBowler(data: AddScoreEventDto): Promise<void> {
    // const { bowlerId, bowlerTeamId } = data;
    console.log(data);
  }

  private teamScorecardDataTransform(
    data: TeamScorecard,
    commentaries: Commentary[],
    batsmanScorecard: PlayerScorecard[],
    bowlerScorecard: PlayerScorecard[],
  ): ReadTeamScorecardDto {
    const res = {
      bowlersTeamName: data.bowlersTeamName,
      batsmanTeamName: data.batsmanTeamName,
      runs: data.runs,
      wickets: data.wicket,
      balls: data.balls,
      overs: data.overs,
      wide: data.wide,
      noBall: data.noBall,
      legBye: data.legBye,
      bye: data.bye,
      extras: data.totalExtras,
      overthrow: data.overthrow,
      commentaries: this.commentaryDataTransform(commentaries),
      playerScorecard: {
        batsman: this.batsmanDataTransform(batsmanScorecard),
        bowler: this.bowlerDataTransform(bowlerScorecard),
      },
    };

    return res;
  }

  private commentaryDataTransform(data: Commentary[]): ReadCommentaryI {
    const res: string[] = [];
    data.forEach((el) => {
      res.push(el.comment);
    });
    return { comment: res };
  }

  private bowlerDataTransform(
    data: PlayerScorecard[],
  ): ReadBowlerScorecardDto[] {
    const res: ReadBowlerScorecardDto[] = [];
    data.forEach((element) => {
      res.push({
        playerName: element.playerName,
        runs: element.runs,
        maidens: element.maidens,
        overs: element.overs,
        isOnBowling: element.isOnBowling,
      });
    });

    return res;
  }

  private batsmanDataTransform(
    data: PlayerScorecard[],
  ): ReadBatsmanScorecardDto[] {
    const res: ReadBatsmanScorecardDto[] = [];
    data.forEach((element) => {
      res.push({
        playerName: element.playerName,
        runs: element.runs,
        isOnStrike: element.isOnStrike,
        isOnField: element.isOnField,
      });
    });

    return res;
  }

  // private addStartingDataForPlayers(data: Player[]): Promise<void> {
  //   // const
  // }
}
