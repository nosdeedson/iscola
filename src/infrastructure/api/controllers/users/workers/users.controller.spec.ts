import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { setEnv } from '../../../../__mocks__/env.mock';
import { UserUsecasesService } from '../../../usecases/user-usecases/user-usecases.service';
import { DataBaseConnectionModule } from '../../../../data-base-connection/data-base-connection.module';
import { RepositoryFactoryService } from '../../../../../infrastructure/factory/repositiry-factory/repository-factory.service';
import { DeleteUserFactoryService } from '../../../../../infrastructure/factory/delete-user-factory/delete-user-factory.service';
import { UserAggregateResolverService } from '../../../../factory/user-aggregate-resolver/user-aggregate-resolver.service';
import { CreateUserFactoryService } from '../../../../factory/create-user-service-factory/create-user-factory-service';


describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;

  beforeEach(async () => {
    setEnv();
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UserUsecasesService,
        CreateUserFactoryService,
        RepositoryFactoryService,
        DeleteUserFactoryService,
        UserAggregateResolverService,
      ],
      imports: [DataBaseConnectionModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
