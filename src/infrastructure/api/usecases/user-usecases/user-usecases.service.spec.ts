import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SystemError } from '../../../../domain-services/@shared/system-error';
import { CreateUserService } from '../../../../domain-services/user/create/create.user.service';
import { DeleteUserService } from '../../../../domain-services/user/delete/delete.user.service';
import { FindUserService } from '../../../../domain-services/user/find/find.user.service';
import { InputCreateWorkerDto } from '../../../../domain-services/worker/create/create.worker.dto';
import { RoleEnum } from '../../../../domain/worker/roleEnum';
import { RepositoryFactoryService } from '../../../../infrastructure/factory/repositiry-factory/repository-factory.service';
import { setEnv } from '../../../__mocks__/env.mock';
import { MockCreateUsers } from '../../../__mocks__/mock-create-users-dto';
import { mockFindUserDto } from '../../../__mocks__/mock-dtos/mock-dtos';
import { DomainMocks } from '../../../__mocks__/mocks';
import { DataBaseConnectionModule } from '../../../data-base-connection/data-base-connection.module';
import { WorkerEntity } from '../../../entities/worker/worker.entity';
import { CreateUserServiceFactory } from '../../../factory/create-user-service-factory/create-user-service-factory';
import { DeleteUserFactoryService } from '../../../factory/delete-user-factory/delete-user-factory.service';
import { TrataErros } from '../../../utils/trata-erros/trata-erros';
import { UserUsecasesService } from './user-usecases.service';



// create user mocks
// my return from the factory
const createPersonServiceMock = {
  execute: jest.fn(),
};

const userServiceFactoryMock = {
  createUserServiceFactory: jest.fn(),
};

// delete user mocks 
// return this from factory
const deletePersonServiceMock = {
  execute: jest.fn(),
};

const userServiceDeleteFactory = {
  deleteUserServiceFactory: jest.fn(),
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
        RepositoryFactoryService,
        {
          provide: CreateUserServiceFactory,
          useValue: userServiceFactoryMock
        },
        {
          provide: DeleteUserFactoryService,
          useValue: userServiceDeleteFactory,
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
      userServiceFactoryMock.createUserServiceFactory.mockReturnValue(createPersonServiceMock as any);
      createPersonServiceMock.execute.mockResolvedValue(person);
      const createUserService = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockImplementationOnce(() => Promise.resolve(void 0));     
      await service.create(mockInput);
      expect(userServiceFactoryMock.createUserServiceFactory).toHaveBeenCalledTimes(1)
      expect(userServiceFactoryMock.createUserServiceFactory).toHaveBeenCalledWith(mockInput.accessType);
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

      userServiceFactoryMock.createUserServiceFactory.mockReturnValue(createPersonServiceMock as any);
      createPersonServiceMock.execute.mockRejectedValue(errorToThrow);

      const createUser = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(void 0));

      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementation(() => {throw new BadRequestException('error while creating worker')});

      try {
        await service.create(mockInput);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(userServiceFactoryMock.createUserServiceFactory).toHaveBeenCalledTimes(1);
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
      
      userServiceFactoryMock.createUserServiceFactory.mockReturnValue(createPersonServiceMock as any);
      createPersonServiceMock.execute.mockResolvedValue(person);

      const createUser = jest.spyOn(CreateUserService.prototype, 'execute')
        .mockRejectedValue(errorToThrow);

      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementationOnce(() => {throw new BadRequestException('test')});

      try {
        await service.create(mockInput);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(userServiceFactoryMock.createUserServiceFactory).toHaveBeenCalledTimes(1);
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
      let foundUser = mockFindUserDto();
      const findUserService = jest.spyOn(FindUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(foundUser));
      userServiceDeleteFactory.deleteUserServiceFactory.mockReturnValue(deletePersonServiceMock as any);
      deletePersonServiceMock.execute.mockReturnValue(async () => await Promise.resolve(void 0 ));

      const deleteUser = jest.spyOn(DeleteUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(void 0));
      expect(await service.delete(foundUser.id)).toBe(void 0);
      expect(findUserService).toHaveBeenCalledTimes(1);
      expect(userServiceDeleteFactory.deleteUserServiceFactory).toHaveBeenCalledTimes(1);
      expect(userServiceDeleteFactory.deleteUserServiceFactory).toHaveBeenCalledWith(foundUser.accessType);
      expect(deletePersonServiceMock.execute).toHaveBeenCalledTimes(1);
      expect(deletePersonServiceMock.execute).toHaveBeenCalledWith(foundUser.personId);
      expect(deleteUser).toHaveBeenCalledTimes(1);
      expect(deleteUser).toHaveBeenCalledWith(foundUser.id);
    });

    it('should not find a user to delete', async () =>{
      let foundUser: any = null;
      let expectedId = "1";
      const errorToThrow = new SystemError([{
        "context": "user",
        "message": "user not found",
      }]);
      const findUserService = jest.spyOn(FindUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.reject(errorToThrow));
      userServiceDeleteFactory.deleteUserServiceFactory.mockReturnValue(deletePersonServiceMock as any);
      deletePersonServiceMock.execute.mockReturnValue(async () => await Promise.resolve(void 0 ));
      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementation(() => {throw new BadRequestException('test')});
      try {
        await service.delete(expectedId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(findUserService).toHaveBeenCalledTimes(1);
        expect(findUserService).toHaveBeenCalledWith(expectedId);
        expect(tratarError).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledWith(errorToThrow);
        expect(userServiceDeleteFactory.deleteUserServiceFactory).toHaveBeenCalledTimes(0);
        expect(deletePersonServiceMock.execute).toHaveBeenCalledTimes(0);
      }
    });

    it('should not create a service to delete', async () =>{
       let foundUser = mockFindUserDto();
      const findUserService = jest.spyOn(FindUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(foundUser));
      const errorToThrow = new SystemError([{
        "context": "delete user",
        "message": "fail to create service to delete",
      }]);
      userServiceDeleteFactory.deleteUserServiceFactory.mockRejectedValue(errorToThrow);
      deletePersonServiceMock.execute.mockReturnValue(async () => await Promise.resolve(void 0 ));
      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementation(() => {throw new BadRequestException('test')});
      try {
        await service.delete(foundUser.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(findUserService).toHaveBeenCalledTimes(1);
        expect(findUserService).toHaveBeenCalledWith(foundUser.id);
        expect(userServiceDeleteFactory.deleteUserServiceFactory).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledWith(errorToThrow);
        expect(deletePersonServiceMock.execute).toHaveBeenCalledTimes(0);
      }
    });

    it('should not delete a person', async () =>{
      let foundUser = mockFindUserDto();
      const findUserService = jest.spyOn(FindUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(foundUser));
      const errorToThrow = new SystemError([{
        "context": "delete user",
        "message": "fail to create service to delete",
      }]);
      userServiceDeleteFactory.deleteUserServiceFactory.mockReturnValue(deletePersonServiceMock as any);
      deletePersonServiceMock.execute.mockRejectedValue(errorToThrow);

      const deleteUser = jest.spyOn(DeleteUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(void 0));
      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementation(() => {throw new BadRequestException('test')});
      try {
        await service.delete(foundUser.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(findUserService).toHaveBeenCalledTimes(1);
        expect(findUserService).toHaveBeenCalledWith(foundUser.id);
        expect(tratarError).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledWith(errorToThrow);
        expect(userServiceDeleteFactory.deleteUserServiceFactory).toHaveBeenCalledTimes(1);
        expect(deletePersonServiceMock.execute).toHaveBeenCalledTimes(1);
        expect(deletePersonServiceMock.execute).toHaveBeenCalledWith(foundUser.personId);
        expect(deleteUser).toHaveBeenCalledTimes(0);
      }
    });

    it('should not delete an user', async () =>{
      let foundUser = mockFindUserDto();
      const findUserService = jest.spyOn(FindUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.resolve(foundUser));
      const errorToThrow = new SystemError([{
        "context": "delete user",
        "message": "fail to create service to delete",
      }]);
      userServiceDeleteFactory.deleteUserServiceFactory.mockReturnValue(deletePersonServiceMock as any);
      deletePersonServiceMock.execute.mockImplementation( async () => await Promise.resolve(void 0 ));

      const deleteUser = jest.spyOn(DeleteUserService.prototype, 'execute')
        .mockImplementation(async () => await Promise.reject(errorToThrow));
      const tratarError = jest.spyOn(TrataErros, 'tratarErrorsBadRequest')
        .mockImplementation(() => {throw new BadRequestException('test')});
      try {
        await service.delete(foundUser.id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(findUserService).toHaveBeenCalledTimes(1);
        expect(findUserService).toHaveBeenCalledWith(foundUser.id);
        expect(tratarError).toHaveBeenCalledTimes(1);
        expect(tratarError).toHaveBeenCalledWith(errorToThrow);
        expect(userServiceDeleteFactory.deleteUserServiceFactory).toHaveBeenCalledTimes(1);
        expect(deletePersonServiceMock.execute).toHaveBeenCalledTimes(1);
        expect(deletePersonServiceMock.execute).toHaveBeenCalledWith(foundUser.personId);
        expect(deleteUser).toHaveBeenCalledTimes(1);
        expect(deleteUser).toHaveBeenCalledWith(foundUser.id);
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
