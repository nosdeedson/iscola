"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleEnum_1 = require("../../../domain/worker/roleEnum");
const find_worker_usecase_1 = require("../find/find.worker.usecase");
describe('Find worker unit tests', () => {
    let input;
    let worker;
    beforeEach(() => {
        input = {
            id: '123'
        };
        worker = {
            id: '123',
            birthday: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: 'edson',
            role: roleEnum_1.RoleEnum.ADMINISTRATOR,
        };
    });
    const mockRepository = async () => {
        return {
            create: jest.fn(),
            delete: jest.fn(),
            find: jest.fn().mockReturnValue(await Promise.resolve(worker)),
            findAll: jest.fn(),
            update: jest.fn()
        };
    };
    it('should find a worker', async () => {
        const workerRepository = mockRepository();
        const usecase = new find_worker_usecase_1.FindWorker(await workerRepository);
        const result = await usecase.execute(input);
        expect(result.id).toBe(input.id);
        expect(result.birthday).toEqual(worker.birthday);
        expect(result.createdAt).toEqual(worker.createdAt);
        expect(result.id).toBe(worker.id);
        expect(result.name).toBe(worker.name);
        expect(result.role).toBe(worker.role);
        expect(result.udpatedAt).toEqual(worker.updatedAt);
        expect((await workerRepository).find).toHaveBeenCalledTimes(1);
        expect((await workerRepository).find).toHaveBeenCalledWith(input.id);
    });
    it('should return empty result for a worker', async () => {
        const workerRepository = mockRepository();
        (await workerRepository).find = jest.fn().mockResolvedValue(await Promise.resolve({}));
        const usecase = new find_worker_usecase_1.FindWorker(await workerRepository);
        const result = await usecase.execute(input);
        expect(result.id).toBeUndefined();
        expect(result.birthday).toBeUndefined();
        expect(result.createdAt).toBeUndefined();
        expect(result.id).toBeUndefined();
        expect(result.name).toBeUndefined();
        expect(result.role).toBeUndefined();
        expect(result.udpatedAt).toBeUndefined();
        expect((await workerRepository).find).toHaveBeenCalledTimes(1);
        expect((await workerRepository).find).toHaveBeenCalledWith(input.id);
    });
});
//# sourceMappingURL=find.worker.usecase.unit.test.spec.js.map