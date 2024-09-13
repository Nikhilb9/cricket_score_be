import { Test, TestingModule } from '@nestjs/testing';
import { ScoreRepositoryService } from './score.repository.service';

describe('ScoreRepositoryService', () => {
  let service: ScoreRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreRepositoryService],
    }).compile();

    service = module.get<ScoreRepositoryService>(ScoreRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
