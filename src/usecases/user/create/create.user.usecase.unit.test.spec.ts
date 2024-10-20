import { AccessType } from "../../../domain/user/access.type";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { MockCreateUserUsecase } from "../../../infrastructure/__mocks__/createrUserUseCase";
import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { CreateUserUseCase } from '../create/create.user.usecase';
import { InputCreateUserDto } from "./input.create.user.dto";


describe('create user use case unit test', () =>{

    let input: InputCreateUserDto;
    let personEntity;
    let person;

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
        const createUserUseCase = jest.spyOn(CreateUserUseCase.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();
        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);
        const useCase = new CreateUserUseCase(userRepository, personRepository);
        expect(await useCase.execute(input)).toBe(void 0);
        expect(createUserUseCase).toHaveBeenCalled()
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
        const typePerson = jest.spyOn(CreateUserUseCase.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();
        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);
        const useCase = new CreateUserUseCase(userRepository, personRepository);
        expect(await useCase.execute(input)).toBe(void 0);
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

        const typePerson = jest.spyOn(CreateUserUseCase.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});

        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();

        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);

        const useCase = new CreateUserUseCase(userRepository, personRepository);

        expect(await useCase.execute(input)).toBe(void 0);
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

        const typePerson = jest.spyOn(CreateUserUseCase.prototype, 'typePerson')
            .mockImplementationOnce(() => { return person});

        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const personRepository = MockRepositoriesForUnitTest.mockRepositories();

        personRepository.find = jest.fn().mockReturnValueOnce(() => personEntity);

        const useCase = new CreateUserUseCase(userRepository, personRepository);
        
        expect(await useCase.execute(input)).toBe(void 0);
        expect(typePerson).toHaveBeenCalled();
    })
    
})