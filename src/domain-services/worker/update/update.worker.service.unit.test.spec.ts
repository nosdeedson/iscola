import { Worker } from "../../../domain/worker/worker";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { UpdateWorkerService } from "./udpate.worker.service";
import { InputUpdateWorkerDto } from './update.worker.dto'
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';


describe('UpdateWorkerService unit test', () =>{

    let workerEntity: WorkerEntity;
    let input : InputUpdateWorkerDto;

    beforeEach(() =>{
        let w = new Worker(
            new Date(),
            'edson',
            RoleEnum.ADMINISTRATOR,
            '123',
            new Date(),
            new Date(),
        );

        workerEntity = WorkerEntity.toWorkerEntity(w);

        input = {
            id: '123',
            name: 'edson jose',
            role : RoleEnum.TEACHER
        }
         
    });
    
    it('should update a worker', async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        workerRepository.update = jest.fn().mockReturnValue(await Promise.resolve(void 0));
        workerRepository.find = jest.fn().mockReturnValue(Promise.resolve(workerEntity));
        const usecase = new UpdateWorkerService(workerRepository);
        expect(await usecase.execute(input)).toBe(void 0);
        expect(workerRepository.update).toHaveBeenCalledTimes(1)
    })

    it('should thorw  an error about null name', async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        workerRepository.update = jest.fn().mockReturnValue(await Promise.resolve(void 0));
        workerRepository.find = jest.fn().mockReturnValue(Promise.resolve(workerEntity));
        const usecase = new UpdateWorkerService(workerRepository);
        try {
            let emptyName;
            input.name = emptyName;
            expect(await usecase.execute(input)).toBe(void 0);
        } catch (error) {
            expect(error.message).toBe('teacher: Name should not be null,')
        }
    })

    it('should thorw  an error about null role', async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        workerRepository.update = jest.fn().mockReturnValue(await Promise.resolve(void 0));
        workerRepository.find = jest.fn().mockReturnValue(Promise.resolve(workerEntity));
        const usecase = new UpdateWorkerService(workerRepository);
        try {
            let emptyRole;
            input.role = emptyRole;
            expect(await usecase.execute(input)).toBe(void 0);
        } catch (error) {
            expect(error.message).toBe('teacher: Role should not be null,')
        }
    })
})
