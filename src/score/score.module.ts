import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema, Team } from './models/team.schema';
import { PlayerSchema, Player } from './models/player.schema';
import { ScoreRepositoryService } from './score.repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      { name: Player.name, schema: PlayerSchema },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepositoryService],
})
export class ScoreModule {}
