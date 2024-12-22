import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { UserRepository } from "../../../infrastructure/repositories/user/user.repository";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { DeleteUserService } from './delete.user.service';


describe('service delete user integration tests', () => {

    let appDataSource;

    let userEntity;
    let userRepository;
    let user;

    let personEntity;
    let personRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        user = DomainMocks.mockUserTeacher();
        
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
    });

    it('entities and repositories must be instantiated', () =>{
        expect(userEntity).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(personEntity).toBeDefined();
        expect(personRepository).toBeDefined();
    });

    it('should delete an user', async () =>{
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);
        
        let userEntity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(userEntity)).toBe(void 0);
        
        let wantedId = user.getId();
        let userBD = await userRepository.find(wantedId);
        expect(userBD).toBeDefined();
        expect(userBD.deleteAt).toBeUndefined();

        const service = new DeleteUserService(userRepository);
        expect(await service.execute(wantedId));
        userBD = await userRepository.find(wantedId);
        expect(userBD).toBeNull();
    });
   

    it('should not delete an user', async () =>{
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);
        
        let userEntity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(userEntity)).toBe(void 0);
        
        let wantedId =  'ffd9ee12-438a-46fa-8b9f-211ff3b44a23';
        let userBD = await userRepository.find(user.getId());
        expect(userBD).toBeDefined();
        expect(userBD.deleteAt).toBeUndefined();

        const service = new DeleteUserService(userRepository);
        expect(await service.execute(wantedId));
        userBD = await userRepository.find(user.getId());
        expect(userBD).toBeDefined();
        expect(userBD.deleteAt).toBeUndefined();
    });

})