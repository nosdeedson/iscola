import { RoleEnum } from '../../../domain/worker/roleEnum';
import { Worker } from '../../../domain/worker/worker'
import { FindAllWorker } from './list.worker.usecase';

describe('List worker unit test', () =>{
    let workers: Worker[];
    let worker : Worker;
    // beforeEach(() =>{
    //     worker = new Worker(
    //         new Date(),
    //         'edson',
    //         RoleEnum.ADMINISTRATOR,
    //         '123',
    //         new Date(),
    //         new Date(),
    //     )

    //     workers = [];
    //     workers.push(worker);
    // });

    // const mockRepository = async () =>{
    //     return {
    //         create: jest.fn(),
    //         delete: jest.fn(),
    //         find: jest.fn(),
    //         findAll: jest.fn().mockReturnValue(await Promise.resolve(workers)),
    //         update: jest.fn()
    //     }
    // }


    // it('should list all workers', async () => {
    //     const workerRepository = mockRepository();
    //     const usecase = new FindAllWorker(await workerRepository);
    //     const result = await usecase.execute();

    //     expect(result.all[0].birthday).toEqual(worker.getBirthday());
    //     expect(result.all[0].name).toEqual(worker.getName());
    //     expect(result.all[0].id).toEqual(worker.getId());
    //     expect(result.all[0].createdAt).toEqual(worker.getCreatedAt());
    //     expect(result.all[0].udpatedAt).toEqual(worker.getUpdatedAt());
    //     expect(result.all[0].role).toEqual(worker.getRole());
    //     expect((await workerRepository).findAll).toHaveBeenCalledTimes(1)
    // })

    // it('should return empty list', async () => {
    //     const workerRepository = mockRepository();
    //     (await workerRepository).findAll = jest.fn().mockReturnValue(await Promise.resolve([]));
    //     const usecase = new FindAllWorker(await workerRepository);
    //     const result = await usecase.execute();

    //     expect(result.all.length).toBe(0);
    //     expect((await workerRepository).findAll).toHaveBeenCalledTimes(1)
    // })

})