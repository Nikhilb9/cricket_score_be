import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { BallStatus, EventTypes } from '../enum/enum';
import { AddScoreEventI } from '../interface/internal.interface';

export class AddScoreEventDto implements AddScoreEventI {
  @ApiProperty({
    enum: EventTypes,
    description: 'The type of event',
    required: true,
  })
  @IsEnum(EventTypes)
  event: EventTypes;

  @ApiProperty({
    description: 'Number of runs scored',
    example: 4,
    required: true,
  })
  @IsOptional()
  @IsInt()
  runValue: number;

  @ApiProperty({
    enum: BallStatus,
    description: 'Type of extra run or status of the ball',
    required: true,
  })
  @IsEnum(BallStatus)
  ballStatus: BallStatus;

  @ApiProperty({
    description: 'Indicates if a wicket has fallen',
    example: false,
    required: true,
  })
  @IsBoolean()
  isWicket: boolean;

  @ApiProperty({
    description: 'Indicates if a new baller is used',
    example: false,
    required: true,
  })
  @IsBoolean()
  newBall: boolean;

  @ApiProperty({
    description: 'ID of the batsman',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  batsmanId: string;

  @ApiProperty({
    description: 'ID of the bowler',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  bowlerId: string;
}
