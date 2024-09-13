import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreRepositoryService } from './score.repository.service';
import {
  Commentary,
  CommentarySchema,
  PlayerScorecard,
  PlayerScorecardSchema,
  TeamScorecard,
  TeamScorecardSchema,
  PlayerSchema,
  Player,
  TeamSchema,
  Team,
} from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      { name: Player.name, schema: PlayerSchema },
      { name: PlayerScorecard.name, schema: PlayerScorecardSchema },
      { name: TeamScorecard.name, schema: TeamScorecardSchema },
      { name: Commentary.name, schema: CommentarySchema },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepositoryService],
})
export class ScoreModule {}
