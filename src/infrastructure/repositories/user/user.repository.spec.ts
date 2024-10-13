import { Worker } from '../../../domain/worker/worker';
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { UserEntity } from "../../entities/user/user.entity";
import { WorkerEntity } from "../../entities/worker/worker.entity";
import { UserRepository } from '../user/user.repository';
import { WorkerRepository } from "../worker/worker.repository";

describe('UserRepository uni test', () =>{

    let appDataSource;
    let userModel;
    let userRepository;
    let workerModel;
    let workerRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        userModel = appDataSource.getRepository(UserEntity);
        userRepository = new UserRepository(userModel, appDataSource);
        workerModel = appDataSource.getRepository(WorkerEntity);
        workerRepository = new WorkerRepository(workerModel, appDataSource); 
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(UserEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(WorkerEntity).execute();
        await appDataSource.destroy();
    })

    it('models e repositories must be instantiated', async () =>{
        expect(workerModel).toBeDefined();
        expect(workerRepository).toBeDefined();
        expect(userModel).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    it('should save a user in BD', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let worker = user.getPerson() as Worker;
        let model = WorkerEntity.toWorkerEntity(worker);
        expect(await workerRepository.create(model)).toBe(void 0);

        let wantedid = user.getId();
        let entity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(entity)).toBe(void 0);
        let result = await userRepository.find(wantedid);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedid);
    });

    it('should delete a user in BD', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let worker = user.getPerson() as Worker;
        let model = WorkerEntity.toWorkerEntity(worker);
        expect(await workerRepository.create(model)).toBe(void 0);

        let wantedid = user.getId();
        let entity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(entity)).toBe(void 0);

        let result = await userRepository.find(wantedid);
        expect(result).toBeDefined();

        expect(await userRepository.delete(wantedid)).toBe(void 0);
        result = await userRepository.find(wantedid);

        expect(result).toBeNull();
    });

    it('should find a user in BD', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let worker = user.getPerson() as Worker;
        let model = WorkerEntity.toWorkerEntity(worker);
        expect(await workerRepository.create(model)).toBe(void 0);

        let wantedid = user.getId();
        let entity = UserEntity.toUserEntity(user);
        let result = await userRepository.find(wantedid);
        expect(result).toBeNull();
        expect(await userRepository.create(entity)).toBe(void 0);

        result = await userRepository.find(wantedid);
        expect(result).toBeDefined();

    })

    it('should find all users in BD', async () =>{
        let user = DomainMocks.mockUserAdmin();
        let user1 = DomainMocks.mockUserTeacher();

        let worker = user.getPerson() as Worker;
        let model = WorkerEntity.toWorkerEntity(worker);
        expect(await workerRepository.create(model)).toBe(void 0);

        let worker1 = user1.getPerson() as Worker;
        let model1 = WorkerEntity.toWorkerEntity(worker1);
        expect(await workerRepository.create(model1)).toBe(void 0);

        let entity = UserEntity.toUserEntity(user);
        let entity1 = UserEntity.toUserEntity(user1);
        expect(await userRepository.create(entity)).toBe(void 0);
        expect(await userRepository.create(entity1)).toBe(void 0);

        let results = await userRepository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2)
    });

    it('should update an user in BD', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let worker = user.getPerson() as Worker;
        let model = WorkerEntity.toWorkerEntity(worker);
        expect(await workerRepository.create(model)).toBe(void 0);

        let wantedid = user.getId();

        let entity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(entity)).toBe(void 0);

        let fromBD = await userRepository.find(wantedid);
        let wantedNickname = 'new nickname'
        fromBD.nickname = wantedNickname;
        expect(await userRepository.update(fromBD)).toBe(void 0);
        fromBD = await userRepository.find(wantedid);
        expect(fromBD).toBeDefined();
        expect(fromBD.nickname).toEqual(wantedNickname);
    })

})