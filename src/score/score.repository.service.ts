import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './models/player.schema';
import { Team } from './models/team.schema';

@Injectable()
export class ScoreRepositoryService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async getPlayers(): Promise<Player[]> {
    return this.playerModel.find<Player>().exec();
  }
  async getAllTeams(): Promise<Team[]> {
    return this.teamModel.find<Team>().exec();
  }
  async createTeam(data: Team): Promise<Team> {
    return await this.teamModel.create<Team>(data);
  }
  async createPlayers(data: Player[]): Promise<Player[]> {
    return await this.playerModel.insertMany(data);
  }
}
