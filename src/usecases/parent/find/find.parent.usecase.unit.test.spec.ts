import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { FindParentUseCase } from './find.parent.usecase';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';


describe('FindParentUseCase unit tests', () =>{

    it('should throw a systemError with parent not found', async () => {
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.find = jest.fn().mockImplementationOnce(() => { return null});
        const usecase = new FindParentUseCase(parentRepository);
        const wantedId = '1234'
        try {
            await usecase.execute(wantedId);
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'parent', message: 'Parent not found'}])
        }
    })

    it('should find a parent', async () => {
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const parent = DomainMocks.mockParent();
        const entity = ParentEntity.toParentEntity(parent);
        parentRepository.find = jest.fn().mockImplementationOnce(() => { return entity});

        const wantedId = parent.getId();

        const usecase = new FindParentUseCase(parentRepository);
        let result = await usecase.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    })

})