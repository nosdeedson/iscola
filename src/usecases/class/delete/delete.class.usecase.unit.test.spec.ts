import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks"
import { DeleteClassUseCase} from './delete.class.usecase';


describe('delete class usecase unit test', () =>{
    
    it('should delete a class', async () => {
        let schoolGroup = DomainMocks.mockSchoolGroup();
        let classRepository = await MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteClassUseCase(classRepository);
        expect(await usecase.execute(schoolGroup.getId())).toBe(void 0);
        expect(classRepository.delete).toHaveBeenCalledTimes(1);
        expect(classRepository.delete).toHaveBeenCalledWith(schoolGroup.getId());
    });

    it('given an invalid id should not throw an error', async () => {
        let classRepository = await MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new DeleteClassUseCase(classRepository);
        const invalidId = "1234";
        expect(await usecase.execute(invalidId)).toBe(void 0);
        expect(classRepository.delete).toHaveBeenCalledTimes(1);
        expect(classRepository.delete).toHaveBeenCalledWith(invalidId);
    });

});