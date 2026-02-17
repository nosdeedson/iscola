import { DataSource, Repository } from "typeorm"
import { ParentEntity } from "../../../../infrastructure/entities/parent/parent.entity";
import { ParentRepository } from "../../../../infrastructure/repositories/parent/parent.repository";
import { StudentEntity } from "../../../../infrastructure/entities/student/student.entity";
import { StudentRepository } from "../../../../infrastructure/repositories/student/student.repository";
import { ParentStudentEntity } from "../../../../infrastructure/entities/parent-student/parent.student.entity";
import { ParentStudentRepository } from "../../../../infrastructure/repositories/parent-student/parent.student.repositoy";
import { AppDataSourceMock } from "../../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";

describe('CreateParentStudentService Integration Test', () => {

    let appDataSource: DataSource;
    
    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;
    
    let parentStudentEntity: Repository<ParentStudentEntity>;
    let parentStudentRepository: ParentStudentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);

        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);

        parentStudentEntity = appDataSource.getRepository(ParentStudentEntity);
        parentStudentRepository = new ParentStudentRepository(parentStudentEntity);

    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ParentStudentEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('all entities should be instantiated', async () => {
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();    
        expect(studentRepository).toBeDefined();
        expect(parentStudentEntity).toBeDefined();
        expect(parentStudentRepository).toBeDefined();
    });

    it('should save a parentStudentEntity', async () => {
        const student = DomainMocks.mockStudent();
        const studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        const parent = DomainMocks.mockParent();
        const parentEntity = ParentEntity.toParentEntity(parent);   
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        const parentStudent = ParentStudentEntity.toParentStudentEntity(parentEntity, studentEntity);

        expect(await parentStudentRepository.create(parentStudent)).toBeInstanceOf(ParentStudentEntity);

        const results = await parentStudentRepository.findAll();
        expect(results).toHaveLength(1);
        expect(results[0]).toBeInstanceOf(ParentStudentEntity);
        expect(results[0].studentId).toBe(studentEntity.id);
        expect(results[0].parentId).toBe(parentEntity.id);
    });

});