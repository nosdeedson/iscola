"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("../../../domain/worker/worker");
const roleEnum_1 = require("../../../domain/worker/roleEnum");
const delete_worker_usecase_1 = require("../../../usecases/worker/delete/delete.worker.usecase");
describe('delete worker unit test', () => {
    let worker;
    beforeEach(() => {
        worker = new worker_1.Worker(new Date(), 'edson', roleEnum_1.RoleEnum.ADMINISTRATOR, '123', new Date(), new Date());
    });
    const mockRepository = async () => {
        return {
            create: jest.fn(),
            delete: jest.fn().mockImplementationOnce(() => Promise.resolve(void 0)),
            find: jest.fn().mockReturnValue(Promise.resolve(worker)),
            findAll: jest.fn(),
            update: jest.fn()
        };
    };
    it("should delete a worker ", async () => {
        const workerRepository = await mockRepository();
        const usecase = new delete_worker_usecase_1.DeleteWorkerUsecase(workerRepository);
        expect(await usecase.execute(worker.id));
        expect(workerRepository.delete).toHaveBeenCalledTimes(1);
        expect(workerRepository.find).toHaveBeenCalledTimes(1);
        expect(workerRepository.find).toHaveBeenCalledWith(worker.id);
    });
    it("should do nothing", async () => {
        const workerRepository = await mockRepository();
        workerRepository.find = jest.fn().mockReturnValue(Promise.resolve(null));
        const usecase = new delete_worker_usecase_1.DeleteWorkerUsecase(workerRepository);
        expect(await usecase.execute('invalid_id'));
        expect(workerRepository.delete).toHaveBeenCalledTimes(0);
        expect(workerRepository.find).toHaveBeenCalledTimes(1);
        expect(workerRepository.find).toHaveBeenCalledWith('invalid_id');
    });
});
//# sourceMappingURL=delete.worker.usecase.unit.test.js.map