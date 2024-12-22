import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { UserRepository } from "../../../infrastructure/repositories/user/user.repository";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { FindAllUserService } from './findAll.user.service';

describe('FindAllUserService integration tests', () =>{

    let appDataSource;
    
    let userEntity;
    let userRepository;
    let admin;
    let teacher;

    let personEntity;
    let personRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        userEntity = appDataSource.getRepository(UserEntity);
        userRepository = new UserRepository(userEntity, appDataSource);

        personEntity = appDataSource.getRepository(WorkerEntity);
        personRepository = new WorkerRepository(personEntity, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(UserEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(WorkerEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    })

    it('entities and repositories must be instantiated', async () =>{
        expect(userEntity).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(personEntity).toBeDefined();
        expect(personRepository).toBeDefined();
    });

    it('should find an empty array', async () =>{
        const service = new FindAllUserService(userRepository);
        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0);
    })

    it('should find two users', async () =>{
        admin = DomainMocks.mockUserAdmin();
        teacher = DomainMocks.mockUserTeacher();

        let person = admin.getPerson();
        let person1 = teacher.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        let personEntity1 = WorkerEntity.toWorkerEntity(person1);

        expect(await personRepository.create(personEntity)).toBe(void 0);
        expect(await personRepository.create(personEntity1)).toBe(void 0);

        let adminEntity = UserEntity.toUserEntity(admin);
        let teacherEntity = UserEntity.toUserEntity(teacher);

        expect(await userRepository.create(adminEntity)).toBe(void 0);
        expect(await userRepository.create(teacherEntity)).toBe(void 0);

        const service = new FindAllUserService(userRepository);

        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(2);
        expect(results.all[0].id).toBe(admin.getId());
        expect(results.all[1].id).toBe(teacher.getId());
    })

})