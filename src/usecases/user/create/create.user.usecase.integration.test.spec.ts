import { AccessType } from "../../../domain/user/access.type";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { UserRepository } from "../../../infrastructure/repositories/user/user.repository";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { CreateUserUseCase } from "./create.user.usecase";
import { StudentRepository } from '../../../infrastructure/repositories/student/student.repository';
import { ParentRepository } from '../../../infrastructure/repositories/parent/parent.repository';

describe('create user usecase integration tests', () =>{

    let appDataSource;
    let userEntity;
    let userRepository;

    let personEntity;
    let personRepository;

    beforeEach( async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        userEntity = appDataSource.getRepository(UserEntity);
        userRepository = new UserRepository(userEntity, appDataSource);

        personEntity = appDataSource.getRepository(PersonEntity);
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(UserEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.cre
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('user entity and repository should be instantiated', async () =>{
        expect(userEntity).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(personEntity).toBeDefined();
        expect(personRepository).toBeDefined();
    })

    it('should create an user of type teacher', async () =>{

        personRepository = new WorkerRepository(personEntity, appDataSource); 
        let person = DomainMocks.mockWorker(RoleEnum.TEACHER);
        personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);

        let input = {
            personId: person.getId(),
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.TEACHER
        };

        const useCase = new CreateUserUseCase(userRepository, personRepository);
        expect(await useCase.execute(input)).toBe(void 0);

        let results = await userRepository.findAll();
        expect(results.length).toBe(1);
        expect(results[0].id).toBeDefined();
    });

    it('should create an user of type admin', async () =>{

        personRepository = new WorkerRepository(personEntity, appDataSource); 
        let person = DomainMocks.mockWorker(RoleEnum.ADMINISTRATOR);
        personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);

        let input = {
            personId: person.getId(),
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.ADMIN
        };

        const useCase = new CreateUserUseCase(userRepository, personRepository);
        expect(await useCase.execute(input)).toBe(void 0);

        let results = await userRepository.findAll();
        expect(results.length).toBe(1);
        expect(results[0].id).toBeDefined();
    });

    it('should create an user of type student', async () =>{

        let studentRepository = new StudentRepository(personEntity, appDataSource); 

        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);

        let parent = studentEntity.parents[0];

        let parentRepository = new ParentRepository(personEntity, appDataSource);
        expect(await parentRepository.create(parent)).toBe(void 0);

        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let input = {
            personId: student.getId(),
            email: 'teste@teste',
            password: '1234',
            nickname: 'teste',
            accesstype: AccessType.STUDENT
        };

        const useCase = new CreateUserUseCase(userRepository, studentRepository);
        expect(await useCase.execute(input)).toBe(void 0);

        let results = await userRepository.findAll();
        expect(results.length).toBe(1);
        expect(results[0].id).toBeDefined();
    });

})