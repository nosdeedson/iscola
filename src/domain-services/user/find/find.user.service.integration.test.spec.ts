import { DataSource, Repository } from "typeorm";
import { SystemError } from '../../../domain-services/@shared/system-error';
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { UserRepository } from '../../../infrastructure/repositories/user/user.repository';
import { WorkerRepository } from '../../../infrastructure/repositories/worker/worker.repository';
import { FindUserService } from "./find.user.service";


describe('find user integration unit test', () =>{

    let appDataSource: DataSource;

    let userEntity: Repository<UserEntity>;
    let userRepository: UserRepository;
    
    let workerEntity: Repository<WorkerEntity>;
    let workerRepository: WorkerRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        userEntity = appDataSource.getRepository(UserEntity);
        userRepository = new UserRepository(userEntity, appDataSource);

        workerEntity = appDataSource.getRepository(WorkerEntity);
        workerRepository = new WorkerRepository(workerEntity, appDataSource);
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(UserEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('user entity and repository should be instantiated', async () =>{
        expect(userEntity).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(workerEntity).toBeDefined();
        expect(workerRepository).toBeDefined();
    })

    it('given a valid id should find an user', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let person = user.getPerson() as any;
        let worker = WorkerEntity.toWorkerEntity(person);
        expect(await workerRepository.create(worker)).toBeInstanceOf(WorkerEntity);;

        let userSave = UserEntity.toUserEntity(user);
        
        expect(await userRepository.create(userSave)).toBeInstanceOf(UserEntity);
        let wantedId = userSave.id;
        const service = new FindUserService(userRepository);
        let result = await service.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
    });

    it('given an invalid id should not find an user', async () =>{
        let wantedId = 'f08a20a6-dc13-4e85-b716-3efefecd247a';
        let user = DomainMocks.mockUserTeacher();
        let person = user.getPerson() as any;
        let worker = WorkerEntity.toWorkerEntity(person);
        expect(await workerRepository.create(worker)).toBeInstanceOf(WorkerEntity);;

        let userSave = UserEntity.toUserEntity(user);
        
        expect(await userRepository.create(userSave)).toBeInstanceOf(UserEntity);
        const service = new FindUserService(userRepository);
        try {
            await service.execute(wantedId);
        } catch (error) {
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{context: 'user', message: 'user not found'}]);
        }
    });

});