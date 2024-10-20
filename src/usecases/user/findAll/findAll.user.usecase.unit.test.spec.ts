import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { FindAllUserUseCase } from '../findAll/findAll.user.usecase';


describe('find all user unit test', () =>{

    let admin;
    let teacher;

    afterEach(() =>{
        jest.clearAllMocks();
    })

    it('should find empty array of users', async () =>{
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        userRepository.findAll = jest.fn().mockImplementationOnce(() => {
            return [];
        });
        const usecase = new FindAllUserUseCase(userRepository);
        let results = await usecase.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0);
        expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should find two users', async () =>{
        admin = DomainMocks.mockUserAdmin();
        teacher = DomainMocks.mockUserTeacher();
        let adminEntity = UserEntity.toUserEntity(admin)
        let teacherEntity = UserEntity.toUserEntity(teacher);
        const userRepository = MockRepositoriesForUnitTest.mockRepositories();
        userRepository.findAll = jest.fn().mockImplementationOnce(() => {
            return [ adminEntity, teacherEntity];
        });
        const usecase = new FindAllUserUseCase(userRepository);
        let results = await usecase.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(2);
        expect(userRepository.findAll).toHaveBeenCalledTimes(1);
        expect(results.all[0].id).toBeDefined();
        expect(results.all[1].id).toBeDefined();
    });
})