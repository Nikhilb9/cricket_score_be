import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  Commentary,
  CommentaryDocument,
  PlayerScorecard,
  PlayerScorecardDocument,
  TeamScorecard,
  TeamScorecardDocument,
} from './models';
import {
  GetPlayerScorecardI,
  GetTeamScorecardI,
  UpdatePlayerScorecard,
  UpdateTeamScorecard,
} from './interface/internal.interface';

@Injectable()
export class ScoreRepositoryService {
  constructor(
    @InjectModel(Commentary.name)
    private commentaryModel: Model<CommentaryDocument>,
    @InjectModel(PlayerScorecard.name)
    private playerScorecardModel: Model<PlayerScorecardDocument>,

    @InjectModel(TeamScorecard.name)
    private teamScorecardModel: Model<TeamScorecardDocument>,
  ) {}

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
  async getTeamScoreCard(): Promise<GetTeamScorecardI[]> {
    return await this.teamScorecardModel
      .find<GetTeamScorecardI>()
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

  async deleteAllMatch(): Promise<void> {
    await this.teamScorecardModel.deleteMany();
  }
  async deleteAllCommentaries(): Promise<void> {
    await this.commentaryModel.deleteMany();
  }

  async deleteAllPlayerScorecard(): Promise<void> {
    await this.playerScorecardModel.deleteMany();
  }

  async createCommentary(comment: string, run: number): Promise<void> {
    await this.commentaryModel.create({ comment, run });
  }
  async updatePlayerScoreCard(
    id: string,
    data: UpdatePlayerScorecard,
  ): Promise<PlayerScorecard> {
    return await this.playerScorecardModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
      },
      data,
    );
  }
  async updateTeamScorecard(
    data: UpdateTeamScorecard,
    id: string,
  ): Promise<TeamScorecard> {
    return await this.teamScorecardModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      data,
    );
  }
  async getPlayerScoreCardById(id: string): Promise<GetPlayerScorecardI[]> {
    return await this.playerScorecardModel
      .find<GetPlayerScorecardI>({ playerId: id })
      .sort({ createdAt: 'asc' })
      .limit(1);
  }
}
