import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserServiceFactory } from './create-user-service-factory';
import { DataBaseConnectionModule } from '../../data-base-connection/data-base-connection.module';
import { setEnv } from '../../__mocks__/env.mock';
import { AccessType } from '../../../domain/user/access.type';
import { CreateWorkerService } from '../../../domain-services/worker/create/create.worker.service';
import { CreateStudentService } from '../../../domain-services/student/create/create.student.service';
import { CreateParentService } from '../../../domain-services/parent/create/create.parent.service';


describe('UserServiceFactoryService', () => {
  let service: CreateUserServiceFactory;
  let module: TestingModule;
  beforeAll(async () => {
    setEnv();
    module = await Test.createTestingModule({
      providers: [CreateUserServiceFactory],
      imports: [DataBaseConnectionModule],
    }).compile();

    service = module.get<CreateUserServiceFactory>(CreateUserServiceFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('when accessType equal to teacher must return a CreateWorkerSevice', () => {
    const result = service.createUserServiceFactory(AccessType.TEACHER);
    expect(result).toBeInstanceOf(CreateWorkerService);
  });

  it('when accessType equal to admin must return a CreateWorkerSevice', () => {
    const result = service.createUserServiceFactory(AccessType.ADMIN);
    expect(result).toBeInstanceOf(CreateWorkerService);
  });

  it('when accessType equal to student must return a CreateStudentService', () => {
    const result = service.createUserServiceFactory(AccessType.STUDENT);
    expect(result).toBeInstanceOf(CreateStudentService);
  });

  it('when accessType equal to teacher must return a CreateParentService', () => {
    const result = service.createUserServiceFactory(AccessType.PARENT);
    expect(result).toBeInstanceOf(CreateParentService);
  });

  it('should throw an error when accessType does not exist', () => {
  expect(() => {
    service.createUserServiceFactory('NO_EXIST' as AccessType);
  }).toThrow('Invalid access type');
});


});
