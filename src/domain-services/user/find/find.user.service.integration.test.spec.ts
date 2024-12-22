import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { UserRepository } from '../../../infrastructure/repositories/user/user.repository';
import { FindUserService } from "./find.user.service";
import { WorkerRepository } from '../../../infrastructure/repositories/worker/worker.repository';


describe('find user integration unit test', () =>{

    let appDataSource;

    let userEntity;
    let userRepository;
    let user;

    let personEntity;
    let personRepository;

    beforeEach(async () =>{
        user = DomainMocks.mockUserTeacher();
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        userEntity = appDataSource.getRepository(UserEntity);
        userRepository = new UserRepository(userEntity, appDataSource);

        personEntity = appDataSource.getRepository(WorkerEntity);
        personRepository = new WorkerRepository(personEntity, appDataSource);
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(UserEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(WorkerEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('user entity and repository should be instantiated', async () =>{
        expect(userEntity).toBeDefined();
        expect(userRepository).toBeDefined();
        expect(personEntity).toBeDefined();
        expect(personRepository).toBeDefined();
    })

    it('given a valid id should find an user', async () =>{
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity));
        
        let entity = UserEntity.toUserEntity(user);
        let wantedId = user.getId();
        expect(await userRepository.create(entity)).toBe(void 0);
        const usecase = new FindUserService(userRepository);
        let result = await usecase.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.personId).toBe(person.getId());
    })

    it('given an invalid id should not find an user', async () =>{
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity));
        
        let entity = UserEntity.toUserEntity(user);
        let wantedId = 'f08a20a6-dc13-4e85-b716-3efefecd247a';
        expect(await userRepository.create(entity)).toBe(void 0);
        const usecase = new FindUserService(userRepository);
        try{
            let result = await usecase.execute(wantedId);
        } catch(error){
            expect(error).toEqual( {errors: [ { context: 'user', message: 'user not found' } ]});
        }
    })

})