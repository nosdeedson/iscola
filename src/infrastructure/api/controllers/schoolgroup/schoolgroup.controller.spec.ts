import { Test, TestingModule } from '@nestjs/testing';
import { SchoolgroupController } from './schoolgroup.controller';

describe('SchoolgroupController', () => {
  let controller: SchoolgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolgroupController],
    }).compile();

    controller = module.get<SchoolgroupController>(SchoolgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
