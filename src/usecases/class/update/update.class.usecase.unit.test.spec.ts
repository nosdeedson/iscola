import { UpdateClassDto } from './udpate.class.dto';
import { UpdateClassUseCase } from './update.class.usecase';
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { ClassEntity } from '../../../infrastructure/entities/class/class.entity';
import { Class } from '../../../domain/class/class';


describe('update class usecase unit test', () =>{

    let schoolgroup: Class;
    let entity: ClassEntity;

    beforeEach(() => {
        schoolgroup = DomainMocks.mockSchoolGroup();
        entity = ClassEntity.toClassEntity(schoolgroup);
    });

    afterEach(() =>{
        jest.clearAllMocks();
    })

    it('should throw an error if passing invalid id', async () =>{
        let nonExistentId = '123';
        let wantedBookName = 'bookb1';
        let wantedClassName = 'b1';
        let input : UpdateClassDto = new UpdateClassDto(nonExistentId, wantedBookName, wantedClassName);
        
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.find = jest.fn().mockImplementationOnce(() => {return null});
        const usecase = new UpdateClassUseCase(classRepository);
        try {
            await usecase.execute(input)
        } catch (error) {
            expect(error.errors).toMatchObject([{ "context": "class", "message": "class not found"}]);
            expect(classRepository.find).toHaveBeenCalledTimes(1);
            expect(classRepository.find).toHaveBeenCalledWith(input.id);
            expect(classRepository.update).toHaveBeenCalledTimes(0);
        }
    });

    it('should update a class', async () =>{
        let wantedId = schoolgroup.getId();
        let wantedBookName = 'bookb1';
        let wantedClassName = 'b1';
        let input : UpdateClassDto = new UpdateClassDto(wantedId, wantedBookName, wantedClassName);
        
        const classRepository = MockRepositoriesForUnitTest.mockRepositories();
        classRepository.find = jest.fn().mockImplementationOnce(() => {return entity});
        classRepository.update = jest.fn().mockImplementationOnce(() => {entity.bookName = wantedBookName, entity.className = wantedClassName});
        const usecase = new UpdateClassUseCase(classRepository);

        expect(await usecase.execute(input)).toBe(void 0);
        expect(classRepository.find).toHaveBeenCalledWith(input.id);
        expect(classRepository.find).toHaveBeenCalledTimes(1);
        expect(classRepository.update).toHaveBeenCalledTimes(1);
        
    })

})