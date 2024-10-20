import { AppDataSourceMock } from '../../../infrastructure/__mocks__/appDataSourceMock';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { UserEntity } from '../../../infrastructure/entities/user/user.entity';
import { WorkerEntity } from '../../../infrastructure/entities/worker/worker.entity';
import { UserRepository } from '../../../infrastructure/repositories/user/user.repository';
import { WorkerRepository } from '../../../infrastructure/repositories/worker/worker.repository';
import { UpdateUserDto } from './update.user.dto';
import { UpdateUserUseCase } from './update.user.usecase';


describe('update user integration test', () =>{

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

    it('should thorw an error with id not passed', async () =>{
        
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);
        
        let userEntity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(userEntity)).toBe(void 0);
        
        let wantedId = 'e211c4ba-da05-4d02-8fa0-f5f0a35d4326';
        const useCase = new UpdateUserUseCase(userRepository);
        let input = new UpdateUserDto(wantedId, '123', 'test', 'test@test');
        try {
            useCase.execute(input)
        } catch (error) {
            expect(error).toEqual({errors :[{context: 'user', message: 'id must be informed'}]});
        }
    });

    it('should throw error if input does not have attributes but id', async () =>{
        
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);
        
        let userEntity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(userEntity)).toBe(void 0);
        
        let wantedId = user.getId();
        const useCase = new UpdateUserUseCase(userRepository);
        let input = new UpdateUserDto(wantedId);
        try {
            await useCase.execute(input)
        } catch (error) {
            expect(error).toEqual({errors: [{context: 'user', message: 'at least one atribute must be passed to update an user'}]});
            expect(error.errors[0].message).toBe('at least one atribute must be passed to update an user');
        }
    });

    it('should update an user', async () =>{
        
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);
        
        let userEntity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(userEntity)).toBe(void 0);
        
        let wantedId = user.getId();
        let userBD = await userRepository.find(wantedId);
        expect(userBD).toBeDefined();

        let input = new UpdateUserDto(wantedId, '123', 'test', 'test@test');
        const usecase = new UpdateUserUseCase(userRepository);
        expect(await usecase.execute(input)).toBe(void 0);
        let updatedUser = await userRepository.find(wantedId);
        expect(updatedUser).toBeDefined();
        expect(updatedUser.id).toBe(wantedId);
        expect(updatedUser.password).toBe(input.password);
        expect(updatedUser.nickname).toBe(input.nickname);
        expect(updatedUser.email).toBe(input.email);
    });

    it('should not update an user ', async () =>{
        
        let person = user.getPerson();
        let personEntity = WorkerEntity.toWorkerEntity(person);
        expect(await personRepository.create(personEntity)).toBe(void 0);
        
        let userEntity = UserEntity.toUserEntity(user);
        expect(await userRepository.create(userEntity)).toBe(void 0);
        
        let wantedId = 'e211c4ba-da05-4d02-8fa0-f5f0a35d4326';
        let userBD = await userRepository.find(user.getId());
        expect(userBD).toBeDefined();

        let input = new UpdateUserDto(wantedId, 'different', 'test', 'test@test');
        const usecase = new UpdateUserUseCase(userRepository);
        expect(await usecase.execute(input)).toBe(void 0);
        let updatedUser = await userRepository.find(user.getId());
        expect(updatedUser).toBeDefined();
        expect(updatedUser.id).toBe(user.getId());
        expect(updatedUser.password == input.password).toBeFalsy();
        expect(updatedUser.nickname == input.nickname).toBeFalsy();
        expect(updatedUser.email == input.email).toBeFalsy();
    })

})