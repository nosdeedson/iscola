"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("../../../domain/worker/worker");
const roleEnum_1 = require("../../../domain/worker/roleEnum");
const udpate_worker_usecase_1 = require("./udpate.worker.usecase");
describe('Update worker unit test', () => {
    let worker;
    let input;
    beforeEach(() => {
        worker = new worker_1.Worker(new Date(), 'edson', roleEnum_1.RoleEnum.ADMINISTRATOR, '123', new Date(), new Date());
        input = {
            id: '123',
            name: 'edson jose',
            role: roleEnum_1.RoleEnum.TEACHER
        };
    });
    const mockRepository = async () => {
        return {
            create: jest.fn(),
            delete: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(worker)),
            findAll: jest.fn(),
            update: jest.fn().mockReturnValue(await Promise.resolve(void 0))
        };
    };
    it('should update a worker', async () => {
        const workerRepository = await mockRepository();
        const usecase = new udpate_worker_usecase_1.UpdateUseCaseWorker(workerRepository);
        expect(await usecase.execute(input)).toBe(void 0);
        expect(workerRepository.update).toHaveBeenCalledTimes(1);
    });
    it('should thorw  an error about null name', async () => {
        const workerRepository = await mockRepository();
        const usecase = new udpate_worker_usecase_1.UpdateUseCaseWorker(workerRepository);
        try {
            let emptyName;
            input.name = emptyName;
            expect(await usecase.execute(input)).toBe(void 0);
        }
        catch (error) {
            expect(error.message).toBe('teacher: Name should not be null,');
        }
    });
    it('should thorw  an error about null role', async () => {
        const workerRepository = await mockRepository();
        const usecase = new udpate_worker_usecase_1.UpdateUseCaseWorker(workerRepository);
        try {
            let emptyRole;
            input.role = emptyRole;
            expect(await usecase.execute(input)).toBe(void 0);
        }
        catch (error) {
            expect(error.message).toBe('teacher: Role should not be null,');
        }
    });
});
//# sourceMappingURL=update.workder.usecase.unit.test.spec.js.map