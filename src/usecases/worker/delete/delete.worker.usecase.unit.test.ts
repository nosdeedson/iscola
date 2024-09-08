import { Worker } from '../../../domain/worker/worker'
import { RoleEnum } from '../../../domain/worker/roleEnum'
import { DeleteWorkerUsecase } from '../../../usecases/worker/delete/delete.worker.usecase'


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

    const mockRepository = async () =>{
        return {
            create: jest.fn(),
            delete: jest.fn().mockImplementationOnce(() => Promise.resolve(void 0)),
            find: jest.fn().mockReturnValue(Promise.resolve(worker)),
            findAll: jest.fn(),
            update: jest.fn()
        }
    }

    it("should delete a worker ", async () => {
        const workerRepository = await mockRepository();
        const usecase = new DeleteWorkerUsecase(workerRepository);
        expect(await usecase.execute(worker.getId()));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
    })

    it("should do nothing", async () => {
        const workerRepository = await mockRepository();
        const usecase = new DeleteWorkerUsecase(workerRepository);
        expect(await usecase.execute('invalid_id'));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
    })

})