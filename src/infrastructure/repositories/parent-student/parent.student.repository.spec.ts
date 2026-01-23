import { DataSource, Repository } from "typeorm"
import { ParentRepository } from "../parent/parent.repository";
import { StudentRepository } from "../student/student.repository";
import { ParentStudentRepository } from "../parent-student/parent.student.repositoy";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { ParentStudentEntity } from "../../entities/parent-student/parent.student.entity";
import { DomainMocks } from "../../__mocks__/mocks";



describe('ParentStudentRepository', () => {

    let appDataSource: DataSource;
    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;
    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;
    let parentStudentEntity: Repository<ParentStudentEntity>;
    let parentStudentRepository: ParentStudentRepository;

    beforeAll(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize();
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
        parentStudentEntity = appDataSource.getRepository(ParentStudentEntity);
        parentStudentRepository = new ParentStudentRepository(parentStudentEntity);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
    });

    it('should be defined', () => {
        expect(parentRepository).toBeDefined();
        expect(studentRepository).toBeDefined();
        expect(parentStudentRepository).toBeDefined();
    });

    it('should create a parent student relationship', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let parentEntity = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);
        let student = DomainMocks.mockStudentWithoutParent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        const entity = new ParentStudentEntity();
        entity.parent = parentEntity;
        entity.student = studentEntity;
        entity.id = 'e46c9f3c-9c48-4048-a798-cf58e2c0508f';
        expect(await parentStudentRepository.save(entity)).toBeInstanceOf(ParentStudentEntity);
    });

});