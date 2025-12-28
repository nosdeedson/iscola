import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { setEnv } from '../../../../__mocks__/env.mock';
import { UserUsecasesService } from '../../../usecases/user-usecases/user-usecases.service';
import { DataBaseConnectionModule } from '../../../../data-base-connection/data-base-connection.module';

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    setEnv();
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserUsecasesService],
      imports: [DataBaseConnectionModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
