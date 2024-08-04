import { RoleEnum } from "../../../domain/worker/roleEnum"
import { InputCreateWorkerDto } from "./create.worker.dto"
import CreateWorkerUseCase  from "./create.worker.usecase"

describe('Create worker use case test unit', () => {

    let worker: InputCreateWorkerDto;

    beforeEach(() => {
        worker = {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.ADMINISTRATOR
        }
    })

    const mockRepository = () => {
        return {
            create: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn()
        }
    }

    it("should create a worker", async () => {
        const workerRepository = mockRepository();
        const useCase = new CreateWorkerUseCase(workerRepository);
        expect(await useCase.execute(worker)).toBe(void 0)
        expect(Promise.resolve(await useCase.execute(worker))).resolves.toBe(void 0)
    })

    it("should throw error name should not be null", async () => {
        const workerRepository = mockRepository();
        worker.name = '';
        const useCase = new CreateWorkerUseCase(workerRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.message).toBe("teacher: Name should not be null,")
        }
    })

    it("should throw error", async () => {
        const workerRepository = mockRepository();
        let nothing;
        worker.birthday = nothing;
        const useCase = new CreateWorkerUseCase(workerRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.message).toBe("teacher: Birthday should not be null,")
        }
    })

    it("should throw error", async () => {
        const workerRepository = mockRepository();
        let nothing;
        worker.role = nothing;
        const useCase = new CreateWorkerUseCase(workerRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.message).toBe("teacher: Role should not be null,")
        }
    })
})