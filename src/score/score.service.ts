import { Injectable } from '@nestjs/common';
import { ScoreRepositoryService } from './score.repository.service';
import { Player } from './models/player.schema';
import { TeamType } from './models/interface/score.model.interface';
import { Team } from './models/team.schema';
import { TeamsDto } from './dto/read-teams.dto';
import { ReadTeamScorecardDto } from './dto/read-team-scorecard.dto';
import { Commentary, PlayerScorecard, TeamScorecard } from './models';
import { ReadBatsmanScorecardDto } from './dto/read-batsmand-scorecard.dto';
import { ReadBowlerScorecardDto } from './dto/read-bowler-scorecard.dto';
import { ReadCommentaryI } from './interface/internal.interface';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepositoryService: ScoreRepositoryService,
  ) {}

  async getTeams(): Promise<TeamsDto> {
    const teams = await this.scoreRepositoryService.getAllTeams();
    if (!teams || !teams.length) {
      const [India, Pakistan] = await Promise.all([
        this.createTeam({ teamName: 'India', teamType: TeamType.BATTERS }),
        this.createTeam({ teamName: 'Pakistan', teamType: TeamType.BOWLERS }),
      ]);

      // Create player for India
      const players = [
        { playerName: 'Rohit Sharma', teamId: India._id.toString() },
        { playerName: 'Shubman Gill', teamId: India._id.toString() },
        { playerName: 'Virat Kohli', teamId: India._id.toString() },
        { playerName: 'KL Rahul', teamId: India._id.toString() },
        { playerName: 'Hardik Pandya', teamId: India._id.toString() },
        { playerName: 'Ravindra Jadeja', teamId: India._id.toString() },
        { playerName: 'Shardul Thakur', teamId: India._id.toString() },
        { playerName: 'Jasprit Bumrah', teamId: India._id.toString() },
        { playerName: 'Kuldeep Yadav', teamId: India._id.toString() },
        { playerName: 'Mohammed Siraj', teamId: India._id.toString() },
        { playerName: 'Mohammed Shami', teamId: India._id.toString() },
        { playerName: 'Babar Azam', teamId: Pakistan._id.toString() },
        { playerName: 'Mohammad Rizwan', teamId: Pakistan._id.toString() },
        { playerName: 'Fakhar Zaman', teamId: Pakistan._id.toString() },
        { playerName: 'Imam-ul-Haq', teamId: Pakistan._id.toString() },
        { playerName: 'Shadab Khan', teamId: Pakistan._id.toString() },
        { playerName: 'Iftikhar Ahmed', teamId: Pakistan._id.toString() },
        { playerName: 'Shaheen Afridi', teamId: Pakistan._id.toString() },
        { playerName: 'Haris Rauf', teamId: Pakistan._id.toString() },
        { playerName: 'Naseem Shah', teamId: Pakistan._id.toString() },
        { playerName: 'Mohammad Nawaz', teamId: Pakistan._id.toString() },
        { playerName: 'Agha Salman', teamId: Pakistan._id.toString() },
      ];

      const [playerRes, ,] = await Promise.all([
        this.createPlayers(players),
        this.scoreRepositoryService.createMatch(
          Pakistan.teamName,
          India.teamName,
        ),
      ]);

      return this.teamPlayerDataTransform([India, Pakistan], playerRes);
    } else {
      const players: Player[] = await this.scoreRepositoryService.getPlayers();
      return this.teamPlayerDataTransform(teams, players);
    }
  }

  async getScore(): Promise<ReadTeamScorecardDto> {
    const [commentaries, batsmanScorecard, bowlerScorecard, teamScorecard] =
      (await Promise.all([
        this.scoreRepositoryService.getCommentary(),
        this.scoreRepositoryService.getPlayerScoreCard(true),
        this.scoreRepositoryService.getPlayerScoreCard(false),
        this.scoreRepositoryService.getTeamScoreCard(),
      ])) as [
        Commentary[],
        PlayerScorecard[],
        PlayerScorecard[],
        TeamScorecard[],
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
      this.scoreRepositoryService.deleteAllPlayer(),
      this.scoreRepositoryService.deleteAllPlayerScorecard(),
      this.scoreRepositoryService.deleteAllTeam(),
    ]);
  }

  private async createTeam(team: Team): Promise<Team> {
    return await this.scoreRepositoryService.createTeam(team);
  }

  private async createPlayers(players: Player[]): Promise<Player[]> {
    return await this.scoreRepositoryService.createPlayers(players);
  }

  private teamPlayerDataTransform(
    teamData: Team[],
    playerData: Player[],
  ): TeamsDto {
    const res: TeamsDto = { teams: [] };
    for (let i = 0; i < teamData.length; i++) {
      const players = [];
      for (let j = 0; j < playerData.length; j++) {
        if (teamData[i]._id.toString() === playerData[j].teamId.toString()) {
          players.push({
            playerId: playerData[j]._id.toString(),
            playerName: playerData[j].playerName,
          });
        }
      }
      res.teams.push({
        teamName: teamData[i].teamName,
        teamId: teamData[i]._id.toString(),
        teamType: teamData[i].teamType,
        players: players,
      });
    }
    return res;
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
      });
    });

    return res;
  }
}
