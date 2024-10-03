import { Worker } from '../../../domain/worker/worker'
import { RoleEnum } from '../../../domain/worker/roleEnum'
import { DeleteWorkerUsecase } from '../../../usecases/worker/delete/delete.worker.usecase'
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories'

describe('delete worker unit test', () => {

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
        const usecase = new DeleteWorkerUsecase(workerRepository);
        expect(await usecase.execute(worker.getId()));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
    })

    it("should do nothing", async () => {
        const workerRepository = await MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteWorkerUsecase(workerRepository);
        expect(await usecase.execute('invalid_id'));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
    })

})