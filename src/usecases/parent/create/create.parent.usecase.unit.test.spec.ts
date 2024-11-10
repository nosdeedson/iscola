import { CreateParentDto,  } from './create.parent.dto';
import { CreateParentUseCase } from './create.parent.usecase';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';
import { date } from 'yup';
import { ClassEntity } from '../../../infrastructure/entities/class/class.entity';
import { Notification } from '../../../domain/@shared/notification/notification';
import { Any } from 'typeorm';


describe('createParentUsecase unit tests', () =>{

    it('should create a parent', async () => {
        const mockParent = DomainMocks.mockParent();
        const mockEntity = ParentEntity.toParentEntity(mockParent);

        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();

        const toParent  = jest.spyOn(CreateParentDto, 'toParent').mockReturnValueOnce(mockParent);
        const toEntity  = jest.spyOn(ParentEntity, 'toParentEntity').mockReturnValueOnce(mockEntity);

        const students = [DomainMocks.mockStudent()];

        const dto = new CreateParentDto(new Date(), 'edson');
        const usecase = new CreateParentUseCase(parentRepository);

        expect(await usecase.execute(dto, students)).toBe(void 0);

        expect(toParent).toHaveBeenCalled();
        expect(toParent).toHaveBeenCalledWith(dto, students);
        expect(toEntity).toHaveBeenCalled();
        expect(toEntity).toHaveBeenCalledWith(mockParent)
        expect(parentRepository.create).toHaveBeenCalled();
        expect(parentRepository.create).toHaveBeenCalledWith(mockEntity);
    })

    // name required 
    it('should throw an error while trying to save a parent without name', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
               
        const students = [DomainMocks.mockStudent()];

        let name;
        const dto = new CreateParentDto(new Date(), name);
        const usecase = new CreateParentUseCase(parentRepository);

        try {
            await usecase.execute(dto, students);
        } catch (error) {
            expect(parentRepository.create).toHaveBeenCalledTimes(0);
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([ { context: 'parent', message: 'Name should not be null' } ])
        }
    })

    // birthday: required 
    it('should throw an error while trying to save a parent without birthday', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
               
        const students = [DomainMocks.mockStudent()];

        let birthday;
        const dto = new CreateParentDto(birthday, 'edson');
        const usecase = new CreateParentUseCase(parentRepository);

        try {
            await usecase.execute(dto, students);
        } catch (error) {
            expect(parentRepository.create).toHaveBeenCalledTimes(0);
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([ { context: 'parent', message: 'Birthday should not be null' } ])
        }
    })


    // students: at least one 

    it('should throw an error while trying to save a parent without any student', async () =>{
        const parentRepository = MockRepositoriesForUnitTest.mockRepositories();
               
        let students = [];
        const dto = new CreateParentDto(new Date(), 'edson');
        const usecase = new CreateParentUseCase(parentRepository);

        try {
            await usecase.execute(dto, students);
        } catch (error) {
            expect(parentRepository.create).toHaveBeenCalledTimes(0);
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([ { context: 'parent', message: 'students field must have at least 1 items' } ]);
        }
    })

})