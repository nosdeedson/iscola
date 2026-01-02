import { Test, TestingModule } from '@nestjs/testing';
import { ParentAggregateContext, StudentAggregateContext, UserAggregateResolverService } from './user-aggregate-resolver.service';
import { setEnv } from '../../__mocks__/env.mock';
import { DataBaseConnectionModule } from '../../data-base-connection/data-base-connection.module';
import { AccessType } from '../../../domain/user/access.type';
import { ClassRepository } from '../../../infrastructure/repositories/class/class.repository';
import { ParentRepository } from '../../../infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from '../../../infrastructure/repositories/student/student.repository';
import { WorkerRepository } from '../../../infrastructure/repositories/worker/worker.repository';
import { WorkerAggregateContext } from './user-aggregate-resolver.service';

describe('UserAggregateResolverService', () => {
  let service: UserAggregateResolverService;
  let module: TestingModule;

  beforeEach(async () => {
    setEnv();
    module = await Test.createTestingModule({
      providers: [UserAggregateResolverService],
      imports: [DataBaseConnectionModule]
    }).compile();

    service = module.get<UserAggregateResolverService>(UserAggregateResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should resolve TEACHER aggregate context', () => {
    const context = service.resolve(AccessType.TEACHER) as WorkerAggregateContext;
    expect(context).toBeDefined();
    expect(context.accessType).toBe(AccessType.TEACHER);
    expect(context).toHaveProperty('workerRepository');
    expect(context.workerRepository).toBeInstanceOf(WorkerRepository);
  });

  it('should resolve STUDENT aggregate context', () => {
    const context = service.resolve(AccessType.STUDENT) as StudentAggregateContext;
    expect(context).toBeDefined();
    expect(context.accessType).toBe(AccessType.STUDENT);
    expect(context).toHaveProperty('studentRepository');
    expect(context).toHaveProperty('classRepository');
    expect(context).toHaveProperty('parentsRepository');
    expect(context.studentRepository).toBeInstanceOf(StudentRepository);
  });

  it('should resolve ADMIN aggregate context', () => {
    const context = service.resolve(AccessType.ADMIN) as WorkerAggregateContext;
    expect(context).toBeDefined();
    expect(context.accessType).toBe(AccessType.ADMIN);
    expect(context).toHaveProperty('workerRepository');
    expect(context).toHaveProperty('classRepository');
    expect(context).toHaveProperty('workerRepository');
    expect(context.workerRepository).toBeInstanceOf(WorkerRepository);
  });

  it('should resolve PARENT aggregate context', () => {
    const context = service.resolve(AccessType.PARENT) as ParentAggregateContext;
    expect(context).toBeDefined();
    expect(context.accessType).toBe(AccessType.PARENT);
    expect(context).toHaveProperty('parentRepository');
    expect(context.parentRepository).toBeInstanceOf(ParentRepository);
  });

});
