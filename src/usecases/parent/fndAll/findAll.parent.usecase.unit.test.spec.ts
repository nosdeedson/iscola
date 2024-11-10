import { FindAllParentUseCase} from './findAll.parent.usecase';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';


describe('FindAllParentUseCase unit tests', () =>{

    it('should return empty array', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        parentRepository.findAll = jest.fn().mockImplementationOnce(() => {
            return []
        });
        const usecase = new FindAllParentUseCase(parentRepository);
        const results = await usecase.execute()
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0)
    })

    it('should return all parent', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const parent = DomainMocks.mockParent();
        const entity = ParentEntity.toParentEntity(parent);
        parentRepository.findAll = jest.fn().mockImplementationOnce(() => {
            return [entity]
        });
        const usecase = new FindAllParentUseCase(parentRepository);
        const results = await usecase.execute()
        expect(results).toBeDefined();
        expect(results.all.length).toBe(1);
        expect(results.all[0].id).toBe(parent.getId())
    })
})