"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleEnum_1 = require("../../../domain/worker/roleEnum");
const create_worker_usecase_1 = require("./create.worker.usecase");
describe('Create worker use case test unit', () => {
    let worker;
    beforeEach(() => {
        worker = {
            name: 'edson',
            birthday: new Date(),
            role: roleEnum_1.RoleEnum.ADMINISTRATOR
        };
    });
    const mockRepository = () => {
        return {
            create: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn()
        };
    };
    it("should create a worker", async () => {
        const workerRepository = mockRepository();
        const useCase = new create_worker_usecase_1.default(workerRepository);
        expect(await useCase.execute(worker)).toBe(void 0);
        expect(Promise.resolve(await useCase.execute(worker))).resolves.toBe(void 0);
    });
    it("should throw error name should not be null", async () => {
        const workerRepository = mockRepository();
        worker.name = '';
        const useCase = new create_worker_usecase_1.default(workerRepository);
        try {
            await useCase.execute(worker);
        }
        catch (error) {
            expect(error.message).toBe("teacher: Name should not be null,");
        }
    });
    it("should throw error birthday should not be null", async () => {
        const workerRepository = mockRepository();
        let nothing;
        worker.birthday = nothing;
        const useCase = new create_worker_usecase_1.default(workerRepository);
        try {
            await useCase.execute(worker);
        }
        catch (error) {
            expect(error.message).toBe("teacher: Birthday should not be null,");
        }
    });
    it("should throw error teacher should not be null", async () => {
        const workerRepository = mockRepository();
        let nothing;
        worker.role = nothing;
        const useCase = new create_worker_usecase_1.default(workerRepository);
        try {
            await useCase.execute(worker);
        }
        catch (error) {
            expect(error.message).toBe("teacher: Role should not be null,");
        }
    });
    it("should throw database not available", async () => {
        const workerRepository = mockRepository();
        workerRepository.create = jest.fn().mockImplementationOnce(() => {
            throw "database not available";
        });
        const useCase = new create_worker_usecase_1.default(workerRepository);
        try {
            await useCase.execute(worker);
        }
        catch (error) {
            expect(error).toBe('database not available');
        }
    });
});
//# sourceMappingURL=create.worker.usecase.unit.test.spec.js.map