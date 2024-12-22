import { Worker } from '../../../domain/worker/worker'
import { RoleEnum } from '../../../domain/worker/roleEnum'
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories'
import { DeleteWorkerService } from './delete.worker.service';

describe('DeleteWorkerService unit test', () => {

    let worker : Worker;
    beforeEach(() =>{
        worker = new Worker(
            new Date(),
            'edson',
            RoleEnum.ADMINISTRATOR,
            '123',
            new Date(),
            new Date(),
        );
          
    });

   
    it("should delete a worker ", async () => {
        const workerRepository = await MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteWorkerService(workerRepository);
        expect(await usecase.execute(worker.getId()));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
    })

    it("should do nothing", async () => {
        const workerRepository = await MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteWorkerService(workerRepository);
        expect(await usecase.execute('invalid_id'));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
    })

})