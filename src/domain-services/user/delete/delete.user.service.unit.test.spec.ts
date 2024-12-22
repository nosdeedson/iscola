import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories"
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { DeleteUserService } from '../delete/delete.user.service';


describe('DeleteUserService unit test', () =>{

    it('should delete an user', async () =>{
        let user = DomainMocks.mockUserTeacher();
        let userRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteUserService(userRepository);
        expect(await usecase.execute(user.getId())).toBe(void 0);
        expect(userRepository.delete).toHaveBeenCalledTimes(1);
        expect(userRepository.delete).toHaveBeenCalledWith(user.getId())
    })

})