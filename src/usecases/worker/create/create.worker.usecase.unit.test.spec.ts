import { RoleEnum } from "../../../domain/worker/roleEnum"
import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { InputCreateWorkerDto } from "./create.worker.dto"
import CreateWorkerUseCase  from "./create.worker.usecase"

describe('Create worker use case test unit', () => {

    // TODO CORRECT THE TESTS

    let worker: InputCreateWorkerDto;

    beforeEach(() => {
        worker = {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.TEACHER,
            classCode: '12343'
        }
    })

    const mockRepositoryWorker = () => {
        return MockRepositoriesForUnitTest.mockRepositories();
    }

    const mockRepositorySchoolGroup = () => {
        return {
            create: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
            findByClassCode: jest.fn().mockImplementationOnce(
                () => {
                    return {}
                }
            ),
            update: jest.fn()
        }
    }

    it("should create a worker", async () => {
        const workerRepository = mockRepositoryWorker();
        const classRepository = mockRepositorySchoolGroup();
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository  )
        expect(await useCase.execute(worker)).toBe(void 0)
       // expect(Promise.resolve(await useCase.execute(worker))).resolves.toBe(void 0);
        expect(workerRepository.create).toHaveBeenCalledTimes(1)
    })

    it("should throw error name should not be null", async () => {
        const workerRepository = mockRepositoryWorker();
        const classRepository = mockRepositorySchoolGroup();
        worker.name = '';
        const useCase = new CreateWorkerUseCase(workerRepository,classRepository );
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.message).toBe("teacher: Name should not be null,")
        }
    })

    it("should throw error birthday should not be null", async () => {
        const workerRepository = mockRepositoryWorker();
        const classRepository = mockRepositorySchoolGroup();
        let nothing;
        worker.birthday = nothing;
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.message).toBe("teacher: Birthday should not be null,")
        }
    })

    it("should throw error teacher should not be null", async () => {
        const workerRepository = mockRepositoryWorker();
        const classRepository = mockRepositorySchoolGroup();
        let nothing;
        worker.role = nothing;
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.message).toBe("teacher: Role should not be null,")
        }
    })

    it("should throw database not available", async () => {
        const workerRepository = mockRepositoryWorker();
        const classRepository = mockRepositorySchoolGroup();
        workerRepository.create = jest.fn().mockImplementationOnce( () => {
            throw "database not available"
        })
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository);
        try {
            await useCase.execute(worker)
        } catch (error) {
            expect(error).toBe('database not available')
        }
    })
})