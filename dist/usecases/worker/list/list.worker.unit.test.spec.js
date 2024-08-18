"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleEnum_1 = require("../../../domain/worker/roleEnum");
const worker_1 = require("../../../domain/worker/worker");
const list_worker_usecase_1 = require("./list.worker.usecase");
describe('List worker unit test', () => {
    let workers;
    let worker;
    beforeEach(() => {
        worker = new worker_1.Worker(new Date(), 'edson', roleEnum_1.RoleEnum.ADMINISTRATOR, '123', new Date(), new Date());
        workers = [];
        workers.push(worker);
    });
    const mockRepository = async () => {
        return {
            create: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(await Promise.resolve(workers)),
            update: jest.fn()
        };
    };
    it('should list all workers', async () => {
        const workerRepository = mockRepository();
        const usecase = new list_worker_usecase_1.FindAllWorker(await workerRepository);
        const result = await usecase.execute();
        expect(result.all[0].birthday).toEqual(worker.birthday);
        expect(result.all[0].name).toEqual(worker.name);
        expect(result.all[0].id).toEqual(worker.id);
        expect(result.all[0].createdAt).toEqual(worker.createdAt);
        expect(result.all[0].udpatedAt).toEqual(worker.updatedAt);
        expect(result.all[0].role).toEqual(worker.role);
        expect((await workerRepository).findAll).toHaveBeenCalledTimes(1);
    });
    it('should return empty list', async () => {
        const workerRepository = mockRepository();
        (await workerRepository).findAll = jest.fn().mockReturnValue(await Promise.resolve([]));
        const usecase = new list_worker_usecase_1.FindAllWorker(await workerRepository);
        const result = await usecase.execute();
        expect(result.all.length).toBe(0);
        expect((await workerRepository).findAll).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=list.worker.unit.test.spec.js.map