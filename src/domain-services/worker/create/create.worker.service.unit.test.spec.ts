import { RoleEnum } from "../../../domain/worker/roleEnum"
import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { InputCreateWorkerDto } from "./create.worker.dto"
import { CreateWorkerService }  from "./create.worker.service"
import { SystemError } from '../../@shared/system-error'
import { AccessType } from "../../../domain/user/access.type";

describe('CreateWorkerService test unit', () => {
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
        const service = new CreateWorkerService(workerRepository, classRepository  )
        expect(await service.execute(worker)).toBe(void 0)
       // expect(Promise.resolve(await service.execute(worker))).resolves.toBe(void 0);
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
        const service = new CreateWorkerService(workerRepository,classRepository );
        try {
            await service.execute(worker);
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
        const service = new CreateWorkerService(workerRepository, classRepository);
        try {
            await service.execute(worker);
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
        const service = new CreateWorkerService(workerRepository, classRepository);
        try {
            await service.execute(worker);
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
        const service = new CreateWorkerService(workerRepository, classRepository);
        try {
            await service.execute(worker)
        } catch (error) {
            expect(error.errors[0].message).toBe('database not available')
        }
    })
})