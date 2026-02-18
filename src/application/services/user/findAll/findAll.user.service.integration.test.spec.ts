import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { UserEntity } from "../../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../../infrastructure/entities/worker/worker.entity";
import { UserRepository } from "../../../../infrastructure/repositories/user/user.repository";
import { WorkerRepository } from "../../../../infrastructure/repositories/worker/worker.repository";
import { FindAllUserService } from './findAll.user.service';

describe('FindAllUserService integration tests', () =>{

    let appDataSource: DataSource;
    
    let userEntity: Repository<UserEntity>;
    let userRepository: UserRepository;

    let workerEntity: Repository<WorkerEntity>;
    let workerRepository: WorkerRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSource.getAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        userEntity = appDataSource.getRepository(UserEntity);
        userRepository = new UserRepository(userEntity, appDataSource);

        workerEntity = appDataSource.getRepository(WorkerEntity);
        workerRepository = new WorkerRepository(workerEntity, appDataSource);
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
        expect(workerEntity).toBeDefined();
        expect(workerRepository).toBeDefined();
    });

    it('should find an empty array', async () =>{
        const service = new FindAllUserService(userRepository);
        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0);
    })

    it('should find two users', async () =>{
        let admin = DomainMocks.mockUserAdmin();
        let teacher = DomainMocks.mockUserTeacher();

        let person = admin.getPerson() as any;
        let person1 = teacher.getPerson() as any;
        let personEntity = WorkerEntity.toWorkerEntity(person);
        let personEntity1 = WorkerEntity.toWorkerEntity(person1);

        expect(await workerRepository.create(personEntity)).toBeInstanceOf(WorkerEntity);
        expect(await workerRepository.create(personEntity1)).toBeInstanceOf(WorkerEntity);

        let adminEntity = UserEntity.toUserEntity(admin);
        let teacherEntity = UserEntity.toUserEntity(teacher);

        expect(await userRepository.create(adminEntity)).toBeInstanceOf(UserEntity);
        expect(await userRepository.create(teacherEntity)).toBeInstanceOf(UserEntity);

        const service = new FindAllUserService(userRepository);

        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(2);
        expect(results.all[0].id).toBe(admin.getId());
        expect(results.all[1].id).toBe(teacher.getId());
    });

});