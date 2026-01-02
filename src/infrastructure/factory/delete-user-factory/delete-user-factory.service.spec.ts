import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserFactoryService } from './delete-user-factory.service';
import { DeleteParentService } from '../../../domain-services/parent/delete/delete.parent.service';
import { DeleteStudentService } from '../../../domain-services/student/delete/delete.student.service';
import { DeleteWorkerService } from '../../../domain-services/worker/delete/delete.worker.service';
import { DataBaseConnectionModule } from '../../data-base-connection/data-base-connection.module';
import { setEnv } from '../../__mocks__/env.mock';
import { AccessType } from '../../../domain/user/access.type';

describe('DeleteUserFactoryService', () => {
  let service: DeleteUserFactoryService;
  let module: TestingModule;

  beforeEach(async () => {
    setEnv();
    module = await Test.createTestingModule({
      providers: [DeleteUserFactoryService],
      imports: [DataBaseConnectionModule]
    }).compile();

    service = module.get<DeleteUserFactoryService>(DeleteUserFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a DeleteParentService instance', () => {
    const deleteParentService = service.deleteUserServiceFactory(AccessType.PARENT);
    expect(deleteParentService).toBeInstanceOf(DeleteParentService);
  });

  it('shoult return a DeleteStudent instance', () => {
    const deleteStudentService = service.deleteUserServiceFactory(AccessType.STUDENT);
    expect(deleteStudentService).toBeInstanceOf(DeleteStudentService);
  });

  it('should return a DeleteWorkerService instance of worker', () => {
    const deleteWorkerService = service.deleteUserServiceFactory(AccessType.TEACHER);
    expect(deleteWorkerService).toBeInstanceOf(DeleteWorkerService);
  });

  it('should return a DeleteWorkerService instance of admin', () => {
    const deleteWorkerService = service.deleteUserServiceFactory(AccessType.ADMIN);
    expect(deleteWorkerService).toBeInstanceOf(DeleteWorkerService);
  });

  it('should throw an error for an invalid access type', () => {
    expect(() => service.deleteUserServiceFactory('NOT_EXIST' as AccessType)).toThrow('Invalid access type');
  });

});
