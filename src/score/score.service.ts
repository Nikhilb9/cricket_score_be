import { Injectable } from '@nestjs/common';
import { ScoreRepositoryService } from './score.repository.service';
import { TeamsDto } from './dto/read-teams.dto';
import { ReadTeamScoreDto } from './dto/read-team-score.dto';
import {
  PlayerScore,
  PlayerScoreDocument,
  TeamScore,
  TeamScoreDocument,
} from './models';
import { ReadBatsmanScoreDto } from './dto/read-batsmand-score.dto';
import { ReadBowlerScoreDto } from './dto/read-bowler-score.dto';
import {
  Extras,
  GetCommentaryI,
  ReadCommentaryI,
} from './interface/internal.interface';
import { BallStatus, EventTypes } from './enum/enum';
import { AddScoreEventDto } from './dto/add-score-event.dto';
import { teamPlayers } from './team-player';
import { PlayerScoreModelI } from './models/interface/score.model.interface';

// No validation on ids and data just for demo purpose

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepositoryService: ScoreRepositoryService,
  ) {}

  async getTeams(): Promise<TeamsDto> {
    return { teams: teamPlayers.teams };
  }

  async getScore(): Promise<ReadTeamScoreDto> {
    const [commentaries, batsmanScore, bowlerScore, teamScore] =
      (await Promise.all([
        this.scoreRepositoryService.getCommentary(),
        this.scoreRepositoryService.getPlayerScore(true),
        this.scoreRepositoryService.getPlayerScore(false),
        this.scoreRepositoryService.getTeamScore(),
      ])) as [
        GetCommentaryI[],
        PlayerScoreDocument[],
        PlayerScoreDocument[],
        TeamScoreDocument,
      ];

    return this.teamScoreDataTransform(
      teamScore,
      commentaries,
      batsmanScore,
      bowlerScore,
    );
  }

  async resetMatch(): Promise<void> {
    await Promise.all([
      this.scoreRepositoryService.deleteAllCommentaries(),
      this.scoreRepositoryService.deleteAllMatch(),
      this.scoreRepositoryService.deleteAllPlayerScore(),
    ]);

    // Add empty data for every player score and team score
    await this.scoreRepositoryService.createMatch(
      teamPlayers.teams[1].teamName,
      teamPlayers.teams[0].teamName,
    );
    const playerData: PlayerScoreModelI[] = [];
    teamPlayers.teams[0].players.forEach((el) => {
      playerData.push({
        playerId: el.playerId,
        runs: 0,
        playerName: el.playerName,
        isBatsman: true,
      });
    });

    teamPlayers.teams[1].players.forEach((el) => {
      playerData.push({
        playerId: el.playerId,
        runs: 0,
        playerName: el.playerName,
        isBowler: true,
        isOnField: true,
      });
    });
    playerData[0].isOnStrike = true;
    playerData[0].isOnField = true;
    playerData[1].isOnField = true;
    playerData[12].isOnBowling = true;

    await this.scoreRepositoryService.createAllPlayerScore(playerData);
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
    const teamScore = await this.scoreRepositoryService.getTeamScore();
    const batsmanScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(batsmanId);
    const bowlerScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(bowlerId);
    const nonStrikerBatsman =
      await this.scoreRepositoryService.getNonStrikerBatsman();

    const bowlerUpdateObj = {};
    const batsmanUpdateObj = {};
    const teamUpdateObj = {};

    if (runValue % 2 !== 0) {
      batsmanUpdateObj['isOnStrike'] = false;
      await this.scoreRepositoryService.updatePlayerScore(
        nonStrikerBatsman[0]._id.toString(),
        { isOnStrike: true },
      );
    }

    batsmanUpdateObj['runs'] = runValue + batsmanScore[0].runs;
    bowlerUpdateObj['currentBall'] = 1 + bowlerScore[0].currentBall;
    bowlerUpdateObj['runs'] = runValue + bowlerScore[0].runs;
    teamUpdateObj['runs'] = runValue + teamScore.runs;
    teamUpdateObj['balls'] = 1 + teamScore.balls;

    await this.scoreRepositoryService.updateTeamScore(
      teamUpdateObj,
      teamScore._id.toString(),
    );

    await this.scoreRepositoryService.updatePlayerScore(
      bowlerScore[0]._id.toString(),
      bowlerUpdateObj,
    );
    await this.scoreRepositoryService.updatePlayerScore(
      batsmanScore[0]._id.toString(),
      batsmanUpdateObj,
    );

    await this.scoreRepositoryService.createCommentary(
      `Run added ${runValue}`,
      runValue,
    );
  }

  private async addExtra(data: AddScoreEventDto): Promise<void> {
    const { runValue, ballStatus, batsmanId, bowlerId } = data;
    const teamsScore = await this.scoreRepositoryService.getTeamScore();
    const batsmanScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(batsmanId);
    const bowlerScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(bowlerId);

    const extraRuns: Extras = this.validateExtraConditions(
      ballStatus,
      runValue,
    );

    const totalExtras =
      extraRuns.extras.noBall +
      extraRuns.extras.wide +
      extraRuns.extras.bye +
      extraRuns.extras.legBye +
      extraRuns.extras.overthrow;
    // Update Team

    await this.scoreRepositoryService.updateTeamScore(
      {
        noBall: extraRuns.extras.noBall + teamsScore.noBall,
        wide: extraRuns.extras.wide + teamsScore.wide,
        bye: extraRuns.extras.bye + teamsScore.bye,
        legBye: extraRuns.extras.legBye + teamsScore.legBye,
        overthrow: extraRuns.extras.overthrow + teamsScore.overthrow,
        totalExtras: teamsScore.totalExtras + totalExtras,
        runs: extraRuns.team.totalRuns + teamsScore.runs,
        balls: extraRuns.team.balls + teamsScore.balls,
      },
      teamsScore._id.toString(),
    );
    // Update Bowler
    await this.scoreRepositoryService.updatePlayerScore(
      bowlerScore[0]._id.toString(),
      {
        runs: runValue + bowlerScore[0].runs,
        currentBall: extraRuns.bowler.balls + bowlerScore[0].currentBall,
      },
    );
    // Update Batsman
    await this.scoreRepositoryService.updatePlayerScore(
      batsmanScore[0]._id.toString(),
      {
        runs: runValue + batsmanScore[0].runs,
        currentBall: extraRuns.batsman.balls + batsmanScore[0].currentBall,
      },
    );

    await this.scoreRepositoryService.createCommentary(
      `Add extra run ${runValue}`,
      runValue,
    );
  }

  private async addWicket(data: AddScoreEventDto): Promise<void> {
    const { bowlerId, batsmanId } = data;
    const teamsScore = await this.scoreRepositoryService.getTeamScore();
    const batsmanScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(batsmanId);
    const bowlerScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(bowlerId);

    const batsmans = await this.scoreRepositoryService.getPlayerScore(true);

    const newBatsman = batsmans.filter(
      (val) => !val.isOnField && !val.isOut,
    )[0];

    await this.scoreRepositoryService.updateTeamScore(
      { wicket: teamsScore.wicket + 1, balls: teamsScore.balls + 1 },
      teamsScore._id.toString(),
    );
    await this.scoreRepositoryService.updatePlayerScore(
      batsmanScore[0]._id.toString(),
      { isOut: true, isOnField: false, isOnStrike: false },
    );
    await this.scoreRepositoryService.updatePlayerScore(
      bowlerScore[0]._id.toString(),
      { currentBall: bowlerScore[0].currentBall + 1 },
    );

    await this.scoreRepositoryService.updatePlayerScore(
      newBatsman._id.toString(),
      { isOnStrike: true, isOnField: true },
    );

    await this.scoreRepositoryService.createCommentary(
      `Wicket ${batsmanScore[0].playerName} - ${bowlerScore[0].playerName}`,
      0,
    );
  }

  private async changeBowler(data: AddScoreEventDto): Promise<void> {
    const { bowlerId } = data;
    const teamsScore = await this.scoreRepositoryService.getTeamScore();

    const bowlerScore =
      await this.scoreRepositoryService.getPlayerScoreByPlayerId(bowlerId);
    const bowlers = await this.scoreRepositoryService.getPlayerScore(false);
    const newBowler = bowlers.filter((val) => !val.isOnBowling)[0];

    await this.scoreRepositoryService.updateTeamScore(
      { overs: teamsScore.overs + 1 },
      teamsScore._id.toString(),
    );

    await this.scoreRepositoryService.updatePlayerScore(
      bowlerScore[0]._id.toString(),
      {
        overs: bowlerScore[0].overs + 1,
        isOnBowling: false,
      },
    );
    await this.scoreRepositoryService.updatePlayerScore(
      newBowler._id.toString(),
      { isOnBowling: true },
    );

    await this.scoreRepositoryService.createCommentary(
      `Bowler change ${bowlerScore[0].playerName} - ${newBowler[0].playerName}`,
      0,
    );
  }

  private teamScoreDataTransform(
    data: TeamScore,
    commentaries: GetCommentaryI[],
    batsmanScore: PlayerScore[],
    bowlerScore: PlayerScore[],
  ): ReadTeamScoreDto {
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
      playerScore: {
        batsman: this.batsmanDataTransform(batsmanScore),
        bowler: this.bowlerDataTransform(bowlerScore),
      },
    };

    return res;
  }

  private commentaryDataTransform(data: GetCommentaryI[]): ReadCommentaryI {
    const res: string[] = [];
    data.sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
    );
    data.forEach((el) => {
      res.push(el.comment);
    });
    return { comment: res };
  }

  private bowlerDataTransform(data: PlayerScore[]): ReadBowlerScoreDto[] {
    const res: ReadBowlerScoreDto[] = [];
    data.forEach((element) => {
      res.push({
        playerName: element.playerName,
        runs: element.runs,
        maidens: element.maidens,
        overs: element.overs,
        isOnBowling: element.isOnBowling,
        playerId: element.playerId,
      });
    });

    return res;
  }

  private batsmanDataTransform(data: PlayerScore[]): ReadBatsmanScoreDto[] {
    const res: ReadBatsmanScoreDto[] = [];
    data.forEach((element) => {
      res.push({
        playerName: element.playerName,
        runs: element.runs,
        isOnStrike: element.isOnStrike,
        isOnField: element.isOnField,
        playerId: element.playerId,
      });
    });

    return res;
  }

  private validateExtraConditions(
    ballStatus: BallStatus,
    runs: number,
  ): Extras {
    const matchData = {
      batsman: {
        runs: 0,
        balls: 0,
      },
      bowler: {
        runs: 0,
        balls: 0,
      },
      team: {
        totalRuns: 0,
        balls: 0,
      },
      extras: {
        noBall: 0,
        wide: 0,
        bye: 0,
        legBye: 0,
        overthrow: 0,
      },
    };
    switch (ballStatus) {
      case BallStatus.WIDE:
        matchData.bowler.runs = runs;
        matchData.team.totalRuns = runs;
        matchData.extras.wide = runs;
        break;
      case BallStatus.NO_BALL:
        matchData.batsman.balls = 1;
        matchData.bowler.runs = 1;
        matchData.team.totalRuns = runs;
        matchData.extras.noBall = 1;
        break;
      case BallStatus.LEG_BYE:
        matchData.batsman.balls = 1;
        matchData.bowler.runs = runs;
        matchData.team.totalRuns = runs;
        matchData.extras.legBye = runs;
        matchData.team.balls = 1;
        matchData.bowler.balls = 1;
        break;
      case BallStatus.BYE:
        matchData.batsman.balls = 1;
        matchData.bowler.runs = runs;
        matchData.team.totalRuns = runs;
        matchData.extras.bye = runs;
        matchData.team.balls = 1;
        matchData.bowler.balls = 1;
        break;
      case BallStatus.OVERTHROW:
        matchData.batsman.runs = runs;
        matchData.team.totalRuns = runs;
        matchData.extras.overthrow = runs;

        break;

      default:
        console.log('Invalid scenario');
    }

    return matchData;
  }
}
