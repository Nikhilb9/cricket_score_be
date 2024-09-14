import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreRepositoryService } from './score.repository.service';
import {
  Commentary,
  CommentarySchema,
  PlayerScore,
  PlayerScoreSchema,
  TeamScore,
  TeamScoreSchema,
} from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlayerScore.name, schema: PlayerScoreSchema },
      { name: TeamScore.name, schema: TeamScoreSchema },
      { name: Commentary.name, schema: CommentarySchema },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepositoryService],
})
export class ScoreModule {}
