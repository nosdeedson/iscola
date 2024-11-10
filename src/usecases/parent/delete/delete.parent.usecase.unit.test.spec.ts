import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DeleteParentUseCase } from './delete.parent.usecase';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';


describe('DeleteParentUseCase unit tests', () =>{

    it('should not throw error when trying to delete a parent with nos-existent id', async () =>{

        let parent = DomainMocks.mockParent();
        let entity = ParentEntity.toParentEntity(parent);

        let parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        
        parentRepository.find = jest.fn().mockReturnValueOnce(entity);
        parentRepository.delete = jest.fn().mockImplementationOnce(() => { return void 0});

        let wantedDeletedAt = parent.getDeletedAt();

        const usecase = new DeleteParentUseCase(parentRepository);
        expect(await usecase.execute('1234')).toBe(void 0);
        expect(parentRepository.delete).toHaveBeenCalledTimes(1);
        expect(parentRepository.delete).toHaveBeenCalledWith('1234');

        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(result.deletedAt).toBe(wantedDeletedAt)
    })

    it('should delete a parent', async () => {
        let parent = DomainMocks.mockParent();
        let entity = ParentEntity.toParentEntity(parent);

        let wantedId = parent.getId();

        let parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        
        parentRepository.find = jest.fn().mockReturnValue(entity);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.deletedAt).toBeUndefined();

        let wantedDeletedAt = new Date();

        parentRepository.delete = jest.fn().mockImplementationOnce(() => { entity.deletedAt = wantedDeletedAt});

        const usecase = new DeleteParentUseCase(parentRepository);

        expect(await usecase.execute(wantedId)).toBe(void 0);
        result = await parentRepository.find(wantedId);
        expect(result).toBeDefined()
        expect(result.deletedAt).toBeDefined();
        expect(result.deletedAt).toStrictEqual(wantedDeletedAt)
    })

})