import { ApiProperty } from '@nestjs/swagger';
import { ReadTeamScoreI } from '../interface/internal.interface';
import { ReadCommentaryDto } from './read-commentary.dto';
import { ReadPlayerScoreDto } from './read-player-score.dto';

export class ReadTeamScoreDto implements ReadTeamScoreI {
  @ApiProperty({ description: 'Bowler Team name' })
  bowlersTeamName: string;

  @ApiProperty({ description: 'Batsman Team name' })
  batsmanTeamName: string;

  @ApiProperty({ description: 'Team score' })
  runs: number;

  @ApiProperty({ description: 'Team wickets' })
  wickets: number;

  @ApiProperty({ description: 'Team balls' })
  balls: number;

  @ApiProperty({ description: 'Team overs' })
  overs: number;

  @ApiProperty({ description: 'Team wide runs' })
  wide: number;

  @ApiProperty({ description: 'Team no ball runs' })
  noBall: number;

  @ApiProperty({ description: 'Team leg bye runs' })
  legBye: number;

  @ApiProperty({ description: 'Team bye runs' })
  bye: number;

  @ApiProperty({ description: 'Team total extras' })
  extras: number;

  @ApiProperty({ description: 'Team overthrows' })
  overthrow: number;

  @ApiProperty({
    description: 'Team commentaries',
    type: () => ReadCommentaryDto,
  })
  commentaries: ReadCommentaryDto;

  @ApiProperty({
    description: 'Team players score  bowler and batsman',
    type: () => ReadPlayerScoreDto,
  })
  playerScore: ReadPlayerScoreDto;
}
