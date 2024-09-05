import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { RoleEnum } from '../../../domain/worker/roleEnum';
import { WorkerEntity } from './worker.entity';

describe('WokerModel', () => {
  let worker;
  let schooGroup;
  beforeEach(() => {
    worker = DomainMocks.mockWorker(RoleEnum.TEACHER);
    schooGroup = DomainMocks.mockSchoolGroup();
  })

  it('should be defined as a teacher', () => {
    let entity = WorkerEntity.toWorkerEntity(worker, schooGroup);
    expect(entity).toBeDefined();
    expect(entity.role).toEqual(RoleEnum.TEACHER);
    expect(entity.id).toEqual(worker.getId());
  });
});
