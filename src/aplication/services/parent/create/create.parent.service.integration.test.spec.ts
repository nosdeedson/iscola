import { DataSource, Repository } from "typeorm";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { CreateParentDto } from './create.parent.dto';
import { CreateParentService } from './create.parent.service';


describe('CreateParentService integration tests', () =>{

    let appDataSource: DataSource;
    
    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;

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
        let students: string[] = [];
        
        let input = new CreateParentDto(new Date(), 'edson', students);
        let service = new CreateParentService(parentRepository);
        try{
            await service.execute(input)
        } catch(error){
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([ { context: 'parent', message: 'students field must have at least 1 items' } ])
        }
    })

    it('should save a parent', async () =>{
        // TODO FIX THE TEST
        let parent = DomainMocks.mockParentWithoutStudent()
        let students = [DomainMocks.mockStudentWithoutParent()];
        parent.setStudents(students);
        students[0].setParents(parent);
        let studentEntity = StudentEntity.toStudentEntity(students[0]);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity)
        
        let input = new CreateParentDto(new Date(), 'edson', [students[0].getName()]);
        let service = new CreateParentService(parentRepository);
        expect(await service.execute(input)).toBe(void 0);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(result.id).toBe(parent.getId());
    });
});