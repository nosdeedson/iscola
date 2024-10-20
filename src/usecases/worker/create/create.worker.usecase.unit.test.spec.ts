import { RoleEnum } from "../../../domain/worker/roleEnum"
import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { InputCreateWorkerDto } from "./create.worker.dto"
import CreateWorkerUseCase  from "./create.worker.usecase"
import { SystemError } from '../../@shared/system-error'
import { AccessType } from "../../../domain/user/access.type";

describe('Create worker use case test unit', () => {
    let worker: InputCreateWorkerDto;

    beforeEach(() => {
        worker = {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.TEACHER,
            classCode: '12343',
            email: 'teste@teste',
            nickname: 'edson',
            password: '123',
            accesstype : AccessType.TEACHER
        }
    })

    it("should create a worker", async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.findByClassCode = jest.fn().mockImplementationOnce(
            () => {
                return {}
            }
        );
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository  )
        expect(await useCase.execute(worker)).toBe(void 0)
       // expect(Promise.resolve(await useCase.execute(worker))).resolves.toBe(void 0);
        expect(workerRepository.create).toHaveBeenCalledTimes(1);

    })

    it("should throw error name should not be null", async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.findByClassCode = jest.fn().mockImplementationOnce(
            () => {
                return {}
            }
        );
        worker.name = '';
        const useCase = new CreateWorkerUseCase(workerRepository,classRepository );
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.errors[0].message).toBe("Name should not be null")
        }
    })

    it("should throw error birthday should not be null", async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.findByClassCode = jest.fn().mockImplementationOnce(
            () => {
                return {}
            }
        );
        let nothing;
        worker.birthday = nothing;
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.errors[0].message).toBe("Birthday should not be null")
        }
    })

    it("should throw error teacher should not be null", async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.findByClassCode = jest.fn().mockImplementationOnce(
            () => {
                return {}
            }
        );
        let nothing;
        worker.role = nothing;
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository);
        try {
            await useCase.execute(worker);
        } catch (error) {
            expect(error.errors[0].message).toBe("Role should not be null")
        }
    })

    it("should throw database not available", async () => {
        const workerRepository = MockRepositoriesForUnitTest.mockRepositories();
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.findByClassCode = jest.fn().mockImplementationOnce(
            () => {
                return {}
            }
        );
        workerRepository.create = jest.fn().mockImplementationOnce( () => {
            throw new SystemError([{context: 'teacher', message: "database not available"}]); 
        })
        const useCase = new CreateWorkerUseCase(workerRepository, classRepository);
        try {
            await useCase.execute(worker)
        } catch (error) {
            expect(error.errors[0].message).toBe('database not available')
        }
    })
})