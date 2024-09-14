import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  Commentary,
  CommentaryDocument,
  PlayerScore as PlayerScore,
  PlayerScoreDocument as PlayerScoreDocument,
  TeamScore as TeamScore,
  TeamScoreDocument as TeamScoreDocument,
} from './models';
import {
  GetCommentaryI,
  GetPlayerScoreI,
  GetTeamScoreI,
  UpdatePlayerScore,
  UpdateTeamScore,
} from './interface/internal.interface';
import { PlayerScoreModelI } from './models/interface/score.model.interface';

@Injectable()
export class ScoreRepositoryService {
  constructor(
    @InjectModel(Commentary.name)
    private commentaryModel: Model<CommentaryDocument>,
    @InjectModel(PlayerScore.name)
    private playerScoreModel: Model<PlayerScoreDocument>,
    @InjectModel(TeamScore.name)
    private teamScoreModel: Model<TeamScoreDocument>,
  ) {}

  async createMatch(
    bowlersTeamName: string,
    batsmanTeamName: string,
  ): Promise<TeamScore> {
    return await this.teamScoreModel.create({
      bowlersTeamName: bowlersTeamName,
      batsmanTeamName: batsmanTeamName,
    });
  }
  async createAllPlayerScore(data: PlayerScoreModelI[]): Promise<void> {
    await this.playerScoreModel.insertMany(data);
  }
  async getCommentary(): Promise<GetCommentaryI[]> {
    return await this.commentaryModel
      .find<GetCommentaryI>()
      .sort({ createdAt: 'asc' });
  }
  async getPlayerScore(isBatsman: boolean): Promise<GetPlayerScoreI[]> {
    return await this.playerScoreModel
      .find<GetPlayerScoreI>({
        isBatsman: isBatsman,
      })
      .sort({ createdAt: 'asc' });
  }
  async getTeamScore(): Promise<GetTeamScoreI> {
    return await this.teamScoreModel.findOne<GetTeamScoreI>({
      batsmanTeamName: 'India',
    });
  }

  async getPlayerScoreByPlayerId(playerId: string): Promise<GetPlayerScoreI[]> {
    return await this.playerScoreModel.find({ playerId: playerId });
  }

  async getNonStrikerBatsman() {
    return await this.playerScoreModel.find({
      isBatsman: true,
      isOnField: true,
      isOnStrike: false,
    });
  }

  async deleteAllMatch(): Promise<void> {
    await this.teamScoreModel.deleteMany();
  }
  async deleteAllCommentaries(): Promise<void> {
    await this.commentaryModel.deleteMany();
  }

  async deleteAllPlayerScore(): Promise<void> {
    await this.playerScoreModel.deleteMany();
  }

  async createCommentary(comment: string, run: number): Promise<void> {
    await this.commentaryModel.create({ comment, run });
  }
  async updatePlayerScore(
    id: string,
    data: UpdatePlayerScore,
  ): Promise<PlayerScore> {
    return await this.playerScoreModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      data,
    );
  }
  async updateTeamScore(data: UpdateTeamScore, id: string): Promise<TeamScore> {
    return await this.teamScoreModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      data,
    );
  }
  async getPlayerScoreById(id: string): Promise<GetPlayerScoreI[]> {
    return await this.playerScoreModel
      .find<GetPlayerScoreI>({ playerId: id })
      .sort({ createdAt: 'asc' })
      .limit(1);
  }
}
