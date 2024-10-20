import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { FindUserUseCase } from '../find/find.user.usecase';


describe('Find user use case tests unit', () =>{

    let user;
    beforeEach(() =>{
        user = DomainMocks.mockUserTeacher();
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should find an user', async () =>{
        const userRepository = await MockRepositoriesForUnitTest.mockRepositories();
        userRepository.find = jest.fn().mockImplementationOnce(() =>{
            return user;
        });
        let wantedId = user.getId();
        const useCase = new FindUserUseCase(userRepository);
        let result = await useCase.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        expect(userRepository.find).toHaveBeenCalledTimes(1);
        expect(userRepository.find).toHaveBeenCalledWith(wantedId)
    });

    it('should not find an user', async () =>{
        const userRepository = await MockRepositoriesForUnitTest.mockRepositories();
        userRepository.find = jest.fn().mockImplementationOnce(() =>{
            return null;
        });
        let wantedId = user.getId();
        const useCase = new FindUserUseCase(userRepository);
        try{
            let result = await useCase.execute(wantedId);
        } catch(error){
            expect(error).toEqual( {errors: [ { context: 'user', message: 'user not found' } ]});
        }
    })
})