import { Worker } from "../../../domain/worker/worker";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { UpdateUseCaseWorker } from "./udpate.worker.usecase";
import { InputUpdateWorkerDto } from '../../../usecases/worker/update/update.worker.dto'


describe('Update worker unit test', () =>{

    let worker : Worker;
    let input : InputUpdateWorkerDto;
    // beforeEach(() =>{
    //     worker = new Worker(
    //         new Date(),
    //         'edson',
    //         RoleEnum.ADMINISTRATOR,
    //         '123',
    //         new Date(),
    //         new Date(),
    //     );
    //     input = {
    //         id: '123',
    //         name: 'edson jose',
    //         role : RoleEnum.TEACHER
    //     }
         
    // });

    // const mockRepository = async () =>{
    //     return {
    //         create: jest.fn(),
    //         delete: jest.fn(),
    //         find: jest.fn().mockReturnValue(Promise.resolve(worker)),
    //         findAll: jest.fn(),
    //         update: jest.fn().mockReturnValue(await Promise.resolve(void 0))
    //     }
    // }

    // it('should update a worker', async () => {
    //     const workerRepository = await mockRepository();
    //     const usecase = new UpdateUseCaseWorker(workerRepository);
    //     expect(await usecase.execute(input)).toBe(void 0);
    //     expect(workerRepository.update).toHaveBeenCalledTimes(1)
    // })

    // it('should thorw  an error about null name', async () => {
    //     const workerRepository = await mockRepository();
    //     const usecase = new UpdateUseCaseWorker(workerRepository);
    //     try {
    //         let emptyName;
    //         input.name = emptyName;
    //         expect(await usecase.execute(input)).toBe(void 0);
    //     } catch (error) {
    //         expect(error.message).toBe('teacher: Name should not be null,')
    //     }
    // })

    // it('should thorw  an error about null role', async () => {
    //     const workerRepository = await mockRepository();
    //     const usecase = new UpdateUseCaseWorker(workerRepository);
    //     try {
    //         let emptyRole;
    //         input.role = emptyRole;
    //         expect(await usecase.execute(input)).toBe(void 0);
    //     } catch (error) {
    //         expect(error.message).toBe('teacher: Role should not be null,')
    //     }
    // })
})
