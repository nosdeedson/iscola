import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { InputFindWorkerDto } from '../../../domain-services/worker/find/find.worker.dto';
import { FindWorkerService } from './find.worker.service';


describe('FindWorkerService unit tests', () => {

    let input: InputFindWorkerDto;
    let worker: Worker;
    let workerEntity: WorkerEntity;

    beforeEach(() => {
        input = {
            id: '123'
        };

        worker = new Worker(new Date(), 'jose', RoleEnum.TEACHER, '123')
        workerEntity = WorkerEntity.toWorkerEntity(worker);
    });

    it('should find a worker', async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        workerRepository.find = 
        jest.fn().mockReturnValue(await Promise.resolve(workerEntity));
        const usecase = new FindWorkerService(await workerRepository);
        const result = await usecase.execute(input);

        expect(result.id).toBe(input.id)
        expect(result.birthday).toEqual(worker.getBirthday())
        expect(result.createdAt).toEqual(worker.getCreatedAt())
        expect(result.id).toBe(worker.getId())
        expect(result.name).toBe(worker.getName())
        expect(result.role).toBe(worker.getRole())
        expect(result.udpatedAt).toEqual(worker.getUpdatedAt())
        expect((await workerRepository).find).toHaveBeenCalledTimes(1)
        expect((await workerRepository).find).toHaveBeenCalledWith(input.id)
    })

    it('should return empty result for a worker', async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        (await workerRepository).find = jest.fn().mockReturnValueOnce(await Promise.resolve(null))
        const usecase = new FindWorkerService(await workerRepository);
        const result = await usecase.execute(input);
        expect(result.id).toBeUndefined()
        expect(result.birthday).toBeUndefined()
        expect(result.createdAt).toBeUndefined()
        expect(result.id).toBeUndefined()
        expect(result.name).toBeUndefined()
        expect(result.role).toBeUndefined()
        expect(result.udpatedAt).toBeUndefined()
        expect((await workerRepository).find).toHaveBeenCalledTimes(1)
        expect((await workerRepository).find).toHaveBeenCalledWith(input.id)
    })
})