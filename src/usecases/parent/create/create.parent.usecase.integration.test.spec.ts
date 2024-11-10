import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { CreateParentDto } from './create.parent.dto';
import { CreateParentUseCase } from './create.parent.usecase';


describe('createParentUsecase integration tests', () =>{

    let appDataSource;
    
    let parentEntity;
    let parentRepository;

    let studentEntity;
    let studentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);

        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('entities and repositories must be stantiated', async () =>{
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined();
    });

    it('should throw an error when trying to save a parent without students', async () =>{
        let parent = DomainMocks.mockParentWithoutStudent()
        let students = [];
        
        let input = new CreateParentDto(new Date(), 'edson');
        let usecase = new CreateParentUseCase(parentRepository);
        try{
            await usecase.execute(input, students)
        } catch(error){
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([ { context: 'parent', message: 'students field must have at least 1 items' } ])
        }
    })

    it('should save a parent', async () =>{
        let parent = DomainMocks.mockParentWithoutStudent()
        let students = [DomainMocks.mockStudentWithoutParent()];
        parent.setStudents(students);
        students[0].setParents(parent);
        let studentEntity = StudentEntity.toStudentEntity(students[0]);
        expect(await studentRepository.create(studentEntity)).toBe(void 0)
        
        let input = new CreateParentDto(new Date(), 'edson');
        let usecase = new CreateParentUseCase(parentRepository);
        expect(await usecase.execute(input, students)).toBe(void 0);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(result.id).toBe(parent.getId());
    })
})