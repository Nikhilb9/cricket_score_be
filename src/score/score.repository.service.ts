import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './models/player.schema';
import { Team } from './models/team.schema';
import { Commentary, PlayerScorecard, TeamScorecard } from './models';

@Injectable()
export class ScoreRepositoryService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(Player.name) private playerModel: Model<Player>,
    @InjectModel(Commentary.name) private commentaryModel: Model<Commentary>,
    @InjectModel(PlayerScorecard.name)
    private playerScorecardModel: Model<PlayerScorecard>,
    @InjectModel(TeamScorecard.name)
    private teamScorecardModel: Model<TeamScorecard>,
  ) {}

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.find<Player>();
  }
  async getAllTeams(): Promise<Team[]> {
    return await this.teamModel.find<Team>();
  }
  async createTeam(data: Team): Promise<Team> {
    return await this.teamModel.create<Team>(data);
  }
  async createPlayers(data: Player[]): Promise<Player[]> {
    return await this.playerModel.insertMany(data);
  }
  async getCommentary(): Promise<Commentary[]> {
    return await this.commentaryModel
      .find<Commentary>()
      .sort({ createdAt: 'asc' });
  }
  async getPlayerScoreCard(isBatsman: boolean): Promise<PlayerScorecard[]> {
    return await this.playerScorecardModel
      .find<PlayerScorecard>({
        isBatsman: isBatsman,
      })
      .sort({ createdAt: 'asc' });
  }
  async getTeamScoreCard(): Promise<TeamScorecard[]> {
    return await this.teamScorecardModel
      .find<TeamScorecard>()
      .sort({ createdAt: 'asc' })
      .limit(1);
  }
  async createMatch(
    bowlersTeamName: string,
    batsmanTeamName: string,
  ): Promise<TeamScorecard> {
    return await this.teamScorecardModel.create({
      bowlersTeamName: bowlersTeamName,
      batsmanTeamName: batsmanTeamName,
    });
  }

  async deleteAllTeam(): Promise<void> {
    await this.teamModel.deleteMany();
  }
  async deleteAllMatch(): Promise<void> {
    await this.teamScorecardModel.deleteMany();
  }
  async deleteAllCommentaries(): Promise<void> {
    await this.commentaryModel.deleteMany();
  }
  async deleteAllPlayer(): Promise<void> {
    await this.playerModel.deleteMany();
  }
  async deleteAllPlayerScorecard(): Promise<void> {
    await this.playerScorecardModel.deleteMany();
  }
}
