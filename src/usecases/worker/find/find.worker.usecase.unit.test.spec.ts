import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { InputFindWorkerDto, OutputFindWorkerDto } from '../../../usecases/worker/find/find.worker.dto'
import { FindWorker } from '../find/find.worker.usecase'

describe('Find worker unit tests', () =>{

    let input: InputFindWorkerDto;
    let worker: Worker;

    // beforeEach(() => {
    //     input = {
    //         id: '123'
    //     };

    //     worker =  new Worker(
    //         new Date(),
    //         'jose',
    //         RoleEnum.ADMINISTRATOR,
    //         '123'
    //     )
    // })

    // const mockRepository = async () => {
    //     return {
    //         create: jest.fn(),
    //         delete: jest.fn(),
    //         find: jest.fn().mockReturnValue(await Promise.resolve(worker)),
    //         findAll: jest.fn(),
    //         update: jest.fn()
    //     }
    // }

    // it('should find a worker', async () => {
    //     const workerRepository = mockRepository();
    //     const usecase = new FindWorker(await workerRepository);
    //     const result = await usecase.execute(input);

    //     expect(result.id).toBe(input.id)
    //     expect(result.birthday).toEqual(worker.getBirthday())
    //     expect(result.createdAt).toEqual(worker.getCreatedAt())
    //     expect(result.id).toBe(worker.getId())
    //     expect(result.name).toBe(worker.getName())
    //     expect(result.role).toBe(worker.getRole())
    //     expect(result.udpatedAt).toEqual(worker.getUpdatedAt())
    //     expect((await workerRepository).find).toHaveBeenCalledTimes(1)
    //     expect((await workerRepository).find).toHaveBeenCalledWith(input.id)
    // })

    // it('should return empty result for a worker', async () => {
    //     const workerRepository = mockRepository();
    //     (await workerRepository).find = jest.fn().mockResolvedValue(await Promise.resolve(null))
    //     const usecase = new FindWorker(await workerRepository);
    //     const result = await usecase.execute(input);
    //     expect(result.id).toBeUndefined()
    //     expect(result.birthday).toBeUndefined()
    //     expect(result.createdAt).toBeUndefined()
    //     expect(result.id).toBeUndefined()
    //     expect(result.name).toBeUndefined()
    //     expect(result.role).toBeUndefined()
    //     expect(result.udpatedAt).toBeUndefined()
    //     expect((await workerRepository).find).toHaveBeenCalledTimes(1)
    //     expect((await workerRepository).find).toHaveBeenCalledWith(input.id)
    // })
})