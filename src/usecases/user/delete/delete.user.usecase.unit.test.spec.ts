import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories"
import { DeleteUserUseCase } from './delete.user.usecase';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';


describe('delete user usecase unit test', () =>{

    it('should delete an user', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteUserUseCase(userRepository);
        expect(await usecase.execute(user.getId())).toBe(void 0);
        expect(userRepository.delete).toHaveBeenCalledTimes(1);
        expect(userRepository.delete).toHaveBeenCalledWith(user.getId())
    })

})