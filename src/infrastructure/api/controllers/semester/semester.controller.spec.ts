import { Test, TestingModule } from '@nestjs/testing';
import { SemesterController } from './semester.controller';
import { SemesterUsecases } from '../../usecases/semester-usecases/semester-usecases';

describe('SemesterController', () => {
  let controller: SemesterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemesterController],
      providers: [SemesterUsecases]
    }).compile();

    controller = module.get<SemesterController>(SemesterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
