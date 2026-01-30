import { AccessType } from "../../../../domain/user/access.type";
import { RoleEnum } from "../../../../domain/worker/roleEnum";
import { MockRepositoriesForUnitTest } from "../../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from "../../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../../infrastructure/entities/student/student.entity";
import { WorkerEntity } from "../../../../infrastructure/entities/worker/worker.entity";
import { CreateUserService } from './create.user.service';
import { InputCreateUserDto } from "./input.create.user.dto";


describe('create user service unit test', () =>{

    let input: InputCreateUserDto;
    let personEntity: any;
    let person: any;

    afterEach(() =>{
        jest.clearAllMocks()
    })

    it('should create an user of type teacher', async () =>{
        input = {
            personId: "1234567890",
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.TEACHER
        };
        person = DomainMocks.mockWorker(RoleEnum.TEACHER);
        personEntity = WorkerEntity.toWorkerEntity(person);
        const createUserservice = jest.spyOn(CreateUserService.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();
        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);
        const service = new CreateUserService(userRepository, personRepository);
        expect(await service.execute(input)).toBe(void 0);
        expect(createUserservice).toHaveBeenCalled()
    });

    it('should create an user of type admin', async () =>{
        input = {
            personId: "1234567890",
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.ADMIN
        };
        person = DomainMocks.mockWorker(RoleEnum.ADMINISTRATOR);
        personEntity = WorkerEntity.toWorkerEntity(person);
        const typePerson = jest.spyOn(CreateUserService.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();
        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);
        const service = new CreateUserService(userRepository, personRepository);
        expect(await service.execute(input)).toBe(void 0);
        expect(typePerson).toHaveBeenCalled();
    });

    it('should create an user of type student', async () =>{
        input = {
            personId: "1234567890",
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.STUDENT
        };

        person = DomainMocks.mockStudent();
        personEntity = StudentEntity.toStudentEntity(person);

        const typePerson = jest.spyOn(CreateUserService.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});

        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();

        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);

        const service = new CreateUserService(userRepository, personRepository);

        expect(await service.execute(input)).toBe(void 0);
        expect(typePerson).toHaveBeenCalled();
    });

    it('should create an user of type parent', async () =>{
        input = {
            personId: "1234567890",
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.PARENT
        };

        person = DomainMocks.mockParent();
        personEntity = ParentEntity.toParentEntity(person);

        const typePerson = jest.spyOn(CreateUserService.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});

        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();

        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);

        const service = new CreateUserService(userRepository, personRepository);
        
        expect(await service.execute(input)).toBe(void 0);
        expect(typePerson).toHaveBeenCalled();
    })
    
})