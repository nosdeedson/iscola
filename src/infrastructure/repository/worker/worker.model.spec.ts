import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { WorkerModel } from '../../repository/worker/worker.model';
import { RoleEnum } from '../../../domain/worker/roleEnum';

describe('WokerModel', () => {
  let worker;
  let schooGroup;
  beforeEach(() => {
    worker = DomainMocks.mockWorker(RoleEnum.TEACHER);
    schooGroup = DomainMocks.mockSchoolGroup();
  })

  it('should be defined as a teacher', () => {
    let entity = WorkerModel.toWorkerModel(worker, schooGroup);
    expect(entity).toBeDefined();
    expect(entity.role).toEqual(RoleEnum.TEACHER);
    expect(entity.id).toEqual(worker.getId());
  });
});
