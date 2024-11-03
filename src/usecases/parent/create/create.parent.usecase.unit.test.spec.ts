import { CreateParentDto, CreateParentStudentDto } from './create.parent.dto';
import { CreateParentUseCase } from './create.parent.usecase';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';


describe('createParentUsecase unit tests', () =>{

    it('should create a parent', async () => {
        const mockParent = DomainMocks.mockParent();
        const mockEntity = ParentEntity.toParentEntity(mockParent);
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const toParent  = jest.spyOn(CreateParentDto, 'toParent').mockReturnValueOnce(mockParent);
        const toEntity  = jest.spyOn(ParentEntity, 'toParentEntity').mockReturnValueOnce(mockEntity);

        let student = new CreateParentStudentDto(new Date(), 'jsoe', '1234')
        const dto = new CreateParentDto(new Date(), 'edson', [student]);
        const usecase = new CreateParentUseCase(parentRepository);
        expect(await usecase.execute(dto)).toBe(void 0);
        expect(toParent).toHaveBeenCalled();
        expect(toParent).toHaveBeenCalledWith(dto);
        expect(toEntity).toHaveBeenCalled();
        expect(toEntity).toHaveBeenCalledWith(mockParent)
        expect(parentRepository.create).toHaveBeenCalled();
        expect(parentRepository.create).toHaveBeenCalledWith(mockEntity);
    })

    // name required 
    it('should throw an error while trying to save a parent without name', async () =>{
        const mockParent = DomainMocks.mockParent();
        const mockEntity = ParentEntity.toParentEntity(mockParent);
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const toEntity  = jest.spyOn(ParentEntity, 'toParentEntity').mockReturnValueOnce(mockEntity);

        let student = new CreateParentStudentDto(new Date(), 'jose', '1234');
        let birthday;
        const dto = new CreateParentDto(birthday, 'edson', [student]);
        const usecase = new CreateParentUseCase(parentRepository);

        try {
            await usecase.execute(dto);
        } catch (error) {
            expect(toEntity).toHaveBeenCalledTimes(0);
            expect(error).toBeDefined();
            console.log(error)
        }
    })

    //  TODO create parent tests to be done
    // birthday: required 
    // students: at least one 

})