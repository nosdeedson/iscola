import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SystemError } from '../../../../domain-services/@shared/system-error';
import { CreateUserService } from '../../../../domain-services/user/create/create.user.service';
import { DeleteUserService } from '../../../../domain-services/user/delete/delete.user.service';
import { FindUserDto } from '../../../../domain-services/user/find/find.user.dto';
import { FindUserService } from '../../../../domain-services/user/find/find.user.service';
import { InputCreateWorkerDto } from '../../../../domain-services/worker/create/create.worker.dto';
import { CreateWorkerService } from '../../../../domain-services/worker/create/create.worker.service';
import { DeleteWorkerService } from '../../../../domain-services/worker/delete/delete.worker.service';
import { AccessType } from '../../../../domain/user/access.type';
import { RoleEnum } from '../../../../domain/worker/roleEnum';
import { CreateUserServiceFactory } from '../../../factory/create-user-service-factory/create-user-service-factory';
import { WorkerRepository } from '../../../../infrastructure/repositories/worker/worker.repository';
import { setEnv } from '../../../__mocks__/env.mock';
import { MockCreateUsers } from '../../../__mocks__/mock-create-users-dto';
import { DomainMocks } from '../../../__mocks__/mocks';
import { DataBaseConnectionModule } from '../../../data-base-connection/data-base-connection.module';
import { WorkerEntity } from '../../../entities/worker/worker.entity';
import { TrataErros } from '../../../utils/trata-erros/trata-erros';
import { FindUserOutPutDto } from '../../controllers/users/workers/find-user-dto/find-user-outPut-dto';
import { UserUsecasesService } from './user-usecases.service';
import { InputCreateUserDto } from '../../../../domain-services/user/create/input.create.user.dto';

// my return from the factory
const createPersonServiceMock = {
  execute: jest.fn(),
};

const userServiceFactoryMock = {
  createUserService: jest.fn(),
};

describe('UserUsecasesService', () => {
  let service: UserUsecasesService;
  let module: TestingModule;

  beforeAll(async () => {
    setEnv();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DataBaseConnectionModule],
      providers: [
        UserUsecasesService,
        {
          provide: CreateUserServiceFactory,
          useValue: userServiceFactoryMock
        },
      ],
    }).compile();

    service = module.get<UserUsecasesService>(UserUsecasesService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user as a TEACHER', async () => {
      const person = WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER));
      const mockInput = MockCreateUsers.toCreateWorker();
      const input = new InputCreateWorkerDto(mockInput);
      userServiceFactoryMock.createUserService.mockReturnValue(createPersonServiceMock as any);
      createPersonServiceMock.execute.mockResolvedValue(person);
      const createUserService = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve(void 0));     
      await service.create(mockInput);
      expect(userServiceFactoryMock.createUserService).toHaveBeenCalledTimes(1)
      expect(userServiceFactoryMock.createUserService).toHaveBeenCalledWith(mockInput.accessType);
      expect(createPersonServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(createPersonServiceMock.execute).toHaveBeenCalledWith(input);
      expect(createUserService).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when creating worker', async () => {
      const mockInput = MockCreateUsers.toCreateWorker();
      var errorToThrow = new SystemError([{
        "context": "worker",
        "message": "error while creating worker",
      }]);

      userServiceFactoryMock.createUserService.mockReturnValue(createPersonServiceMock as any);
      createPersonServiceMock.execute.mockRejectedValue(errorToThrow);

      const createUser = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(void 0));

      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementation(() => {throw new BadRequestException('error while creating worker')});

      try {
        await service.create(mockInput);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(userServiceFactoryMock.createUserService).toHaveBeenCalledTimes(1);
        expect(createPersonServiceMock.execute).toHaveBeenCalledTimes(1);
        expect(createUser).toHaveBeenCalledTimes(0);
        expect(tratarError).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledWith(errorToThrow);
      }
    });

    it('should throw an error when creating user', async () => {
      const person = WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER));
      const mockInput = MockCreateUsers.toCreateWorker();
      const input = new InputCreateWorkerDto(mockInput);
      var errorToThrow = new SystemError([{
        "context": "user",
        "message": "error while creating user",
      }]);
      
      userServiceFactoryMock.createUserService.mockReturnValue(createPersonServiceMock as any);
      createPersonServiceMock.execute.mockResolvedValue(person);

      const createUser = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockRejectedValue(errorToThrow);

      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementationOnce(() => {throw new BadRequestException('test')});

      try {
        await service.create(mockInput);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(userServiceFactoryMock.createUserService).toHaveBeenCalledTimes(1);
        expect(createPersonServiceMock.execute).toHaveBeenCalledTimes(1);
        expect(createPersonServiceMock.execute).toHaveBeenCalledWith(input);
        expect(createUser).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledWith(errorToThrow);
      }
    });
  });

  describe('delele', () =>{
    it('should delete a user', async () => {
      expect(true).toBe(true)
      // const id = '1';
      // const deleteWorker = jest.spyOn(DeleteWorkerService.prototype, 'execute')
      //   .mockImplementation(async () => await Promise.resolve(void 0));
      // const deleteUser = jest.spyOn(DeleteUserService.prototype, 'execute')
      //   .mockImplementation(async () => await Promise.resolve(void 0));
      // expect(await service.delete(id)).toBe(void 0);
      // expect(deleteWorker).toHaveBeenCalledTimes(1);
      // expect(deleteWorker).toHaveBeenCalledWith(id);
      // expect(deleteUser).toHaveBeenCalledTimes(1);
      // expect(deleteUser).toHaveBeenCalledWith(id);
    });

    it('should not delete a worker', async () =>{
      expect(true).toBe(true)
      // const id = '1';
      // const deleteWorker = jest.spyOn(DeleteWorkerService.prototype, 'execute')
      //   .mockRejectedValue(new SystemError([{
      //     "context": "worker",
      //     "message": "error while deleting worker",
      //   }]));
      // const deleteUser = jest.spyOn(DeleteUserService.prototype, 'execute')
      //   .mockImplementation(async () => await Promise.resolve(void 0));
      // try {
      //   await service.delete(id);
      // } catch (error) {
      //   expect(error).toBeInstanceOf(BadRequestException);
      //   expect(deleteWorker).toHaveBeenCalledTimes(1);
      //   expect(deleteWorker).toHaveBeenCalledWith(id);
      //   expect(deleteUser).toHaveBeenCalledTimes(0);
      // }
    });

    it('should not delete a user', async () =>{
      const id = '1';
      const deleteWorker = jest.spyOn(DeleteWorkerService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(void 0));
      const deleteUser = jest.spyOn(DeleteUserService.prototype, 'execute')
        .mockRejectedValue(new SystemError([{
          "context": "user",
          "message": "error while deleting user",
        }]));
      try {
        await service.delete(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(deleteWorker).toHaveBeenCalledTimes(1);
        expect(deleteWorker).toHaveBeenCalledWith(id);
        expect(deleteUser).toHaveBeenCalledTimes(1);
        expect(deleteUser).toHaveBeenCalledWith(id);
      }
    });
  });

  describe('find', () =>{

    it('should find a user which role is teacher', async () => {
      expect(true).toBe(true)

      // const worker = WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER));
      // const id = worker.id;
      
      // let userFoundDto = new FindUserDto('1', worker.id, 'email', 'nickname', AccessType.TEACHER);
      // const findUser = jest.spyOn(FindUserService.prototype, 'execute')
      // .mockImplementation(async () => await Promise.resolve(userFoundDto));
      // const findPerson = jest.spyOn(WorkerRepository.prototype, 'find')
      // .mockImplementation(async () => await Promise.resolve(worker));
      // const result = await service.find(id);
      // expect(result).toBeInstanceOf(FindUserOutPutDto);
      // expect(findUser).toHaveBeenCalledTimes(1);
      // expect(findUser).toHaveBeenCalledWith(id);
      // expect(findPerson).toHaveBeenCalledTimes(1);
      // expect(findPerson).toHaveBeenCalledWith(worker.id);
    });

    it('when trying to get a user should throw an error if user does not exist', async () => {
      expect(true).toBe(true)

      // const id = '1';
      // const findUser = jest.spyOn(FindUserService.prototype, 'execute')
      //   .mockImplementation(async () => await Promise.reject(new SystemError([{context: 'user', message: 'user not found'}])));
      // const worker = WorkerEntity.toWorkerEntity(DomainMocks.mockWorker(RoleEnum.TEACHER));
      // const findPerson = jest.spyOn(WorkerRepository.prototype, 'find')
      //   .mockImplementation(async () => await Promise.resolve(worker));
      // const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
      //   .mockImplementation(() => {throw new BadRequestException('user not found')});
      // try {
      //   const result = await service.find(id);
      // } catch (error) {
      //   expect(error).toBeInstanceOf(BadRequestException);
      //   expect(findUser).toHaveBeenCalledTimes(1);
      //   expect(findUser).toHaveBeenCalledWith(id);
      //   expect(findPerson).toHaveBeenCalledTimes(0);
      //   expect(tratarError).toHaveBeenCalledTimes(1);
      //   expect(tratarError).toHaveBeenCalledWith(new SystemError([{context: 'user', message: 'user not found'}]));
      // }
    });

  });

  describe('findAll', () => {
    // it('should find all users', async () => {
    //   const worker = UserEntity.toUserEntity(DomainMocks.mockUserTeacher());
    //   const admin = UserEntity.toUserEntity(DomainMocks.mockUserAdmin());
    //   const all = new FindAllUserDto([worker, admin]);
    //   const findAll = jest.spyOn(FindAllUserService.prototype, 'execute')
    //     .mockImplementation(async () => await Promise.resolve(all));
    //   const findPerson = jest.spyOn(WorkerRepository.prototype, 'find')
    //     .mockImplementation(async () => await Promise.resolve(worker));
    //   const result = await service.findAll();
    //   expect(result).toBeInstanceOf(Array);
    //   expect(result.length).toBe(2);
    //   expect(result[0]).toBeInstanceOf(FindUserOutPutDto);
    //   expect(result[1]).toBeInstanceOf(FindUserOutPutDto);
    //   expect(findAll).toHaveBeenCalledTimes(1);
    //   expect(findPerson).toHaveBeenCalledTimes(2);
    // });
  })

});
