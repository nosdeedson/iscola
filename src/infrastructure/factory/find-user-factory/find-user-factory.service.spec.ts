import { Test, TestingModule } from '@nestjs/testing';
import { FindUserFactoryService } from './find-user-factory.service';
import { DataBaseConnectionModule } from '../../data-base-connection/data-base-connection.module';
import { setEnv } from '../../__mocks__/env.mock';
import { UserAggregateContext, UserAggregateResolverService } from '../user-aggregate-resolver/user-aggregate-resolver.service';
import { RepositoryFactoryService } from '../repositiry-factory/repository-factory.service';
import { AccessType } from '../../../domain/user/access.type';
import { SystemError } from '../../../domain-services/@shared/system-error';
import { FindParentService } from '../../../domain-services/parent/find/find.parent.service';
import { FindStudentService } from '../../../domain-services/student/find/find.student.service';
import { FindWorkerService } from '../../../domain-services/worker/find/find.worker.service';

describe('FindUserFactoryService', () => {
  let service: FindUserFactoryService;
  let module: TestingModule;

  beforeEach(async () => {
    setEnv();
    module = await Test.createTestingModule({
      providers: [
        FindUserFactoryService,
        UserAggregateResolverService,
        RepositoryFactoryService
      ],
      imports: [DataBaseConnectionModule]
    }).compile();

    service = module.get<FindUserFactoryService>(FindUserFactoryService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a FindParentService', () => {
    const findParentService = service.findUserServiceFactory(AccessType.PARENT);
    expect(findParentService).toBeInstanceOf(FindParentService);
  });

  it('should return a FindStudentService', () => {
    const findStudentService = service.findUserServiceFactory(AccessType.STUDENT);
    expect(findStudentService).toBeInstanceOf(FindStudentService);
  });

  it('should return a FindWorkerService', () => {
    const findWorkerService = service.findUserServiceFactory(AccessType.TEACHER);
    expect(findWorkerService).toBeInstanceOf(FindWorkerService);
  });

  it('should throw a SystemError from aggegateResolver', () => {
    try {
      service.findUserServiceFactory('NO_EXIXT' as AccessType);
    } catch (error) {
      expect(error).toBeInstanceOf(SystemError);
      //@ts-ignore
      expect(error.errors).toStrictEqual([{ context: "UserAggregateResolver", message: 'Invalid access type' }]);
    }
  });

  it('should throw a SystemError from findUserFactory', () => {
    try {
      jest.spyOn(UserAggregateResolverService.prototype, 'resolve')
        .mockImplementation(() => ({
          accessType: 'NO_EXIST' as AccessType,
          parentRepository: undefined
        }) as UserAggregateContext)
      service.findUserServiceFactory('NO_EXIST' as AccessType);
    } catch (error) {
      expect(error).toBeInstanceOf(SystemError);
      //@ts-ignore
      expect(error.errors).toStrictEqual([{ context: "find User", message: 'fail to create service to find user' }])
    }
  });

});
