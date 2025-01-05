import { Test, TestingModule } from '@nestjs/testing';
import { SchoolgroupUsecaseService } from './schoolgroup-usecase.service';

describe('SchoolgroupUsecaseService', () => {
  let service: SchoolgroupUsecaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolgroupUsecaseService],
    }).compile();

    service = module.get<SchoolgroupUsecaseService>(SchoolgroupUsecaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
