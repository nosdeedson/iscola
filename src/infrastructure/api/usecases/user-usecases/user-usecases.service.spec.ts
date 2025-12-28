import { Test, TestingModule } from '@nestjs/testing';
import { after } from 'node:test';
import { setEnv } from '../../../__mocks__/env.mock';
import { DataBaseConnectionModule } from '../../../data-base-connection/data-base-connection.module';
import { UserUsecasesService } from './user-usecases.service';
import { MockCreateUsers } from '../../../__mocks__/mock-create-users-dto';
import { InputCreateWorkerDto } from '../../../../domain-services/worker/create/create.worker.dto';
import { CreateWorkerService } from '../../../../domain-services/worker/create/create.worker.service';
import { CreateUserService } from '../../../../domain-services/user/create/create.user.service';
import { DomainMocks } from '../../../__mocks__/mocks';
import { WorkerEntity } from '../../../entities/worker/worker.entity';
import { AccessType } from '../../../../domain/user/access.type';
import { RoleEnum } from '../../../../domain/worker/roleEnum';

describe('UserUsecasesService', () => {
  let service: UserUsecasesService;
  let module: TestingModule;

  beforeAll(async () => {
    setEnv();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DataBaseConnectionModule],
      providers: [UserUsecasesService],
    }).compile();

    service = module.get<UserUsecasesService>(UserUsecasesService);
  });

  after(async () => {
    jest.clearAllMocks();
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const person = WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER));
      const mockInput = MockCreateUsers.toCreateWorker();
      const input = new InputCreateWorkerDto(mockInput);
      const createWorker = jest.spyOn(CreateWorkerService.prototype, 'execute')
        .mockResolvedValue(person);
      const createUser = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(void 0));
      expect(await service.create(mockInput)).toBe(void 0);
      expect(createWorker).toHaveBeenCalledTimes(1);
      expect(createWorker).toHaveBeenCalledWith(input);
      expect(createUser).toHaveBeenCalledTimes(1)
    });

    it('should throw an error if the user already exists', async () => {
      // const dto = {
      //   name: 'John Doe',
      //   email: 'john.doe@example.com',
      //   password: 'XXXXXXXX',
      //   cpf: '12345678901',
      //   classId: 1,
      // };
      // await expect(service.create(dto)).rejects.toThrowError();
    });
  });

});
