import { Test, TestingModule } from '@nestjs/testing';
import { UserUsecases } from './user-usecases';

describe('UserUsecasesService', () => {
  let service: UserUsecases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUsecases],
    }).compile();

    service = module.get<UserUsecases>(UserUsecases);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
