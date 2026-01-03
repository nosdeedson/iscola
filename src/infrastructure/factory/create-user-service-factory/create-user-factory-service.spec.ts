import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserFactoryService } from './create-user-factory-service';
import { DataBaseConnectionModule } from '../../data-base-connection/data-base-connection.module';
import { setEnv } from '../../__mocks__/env.mock';
import { AccessType } from '../../../domain/user/access.type';
import { CreateWorkerService } from '../../../domain-services/worker/create/create.worker.service';
import { CreateStudentService } from '../../../domain-services/student/create/create.student.service';
import { CreateParentService } from '../../../domain-services/parent/create/create.parent.service';
import { UserAggregateResolverService } from '../user-aggregate-resolver/user-aggregate-resolver.service';
import { SystemError } from '../../../domain-services/@shared/system-error';
import { RepositoryFactoryService } from '../repositiry-factory/repository-factory.service';


describe('UserServiceFactoryService', () => {
  let service: CreateUserFactoryService;
  let module: TestingModule;
  beforeAll(async () => {
    setEnv();
    module = await Test.createTestingModule({
      providers: [
        CreateUserFactoryService,
        UserAggregateResolverService,
        RepositoryFactoryService,
      ],
      imports: [DataBaseConnectionModule],
    }).compile();

    service = module.get<CreateUserFactoryService>(CreateUserFactoryService);
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
    try {
      service.createUserServiceFactory('NO_EXIST' as AccessType);
    } catch (error) {
      expect(error).toBeInstanceOf(SystemError);
      //@ts-ignore
      expect(error.errors).toStrictEqual([{ context: 'UserAggregateResolver', message: 'Invalid access type' }]);
    }
  });


});
