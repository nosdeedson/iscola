import { DataSource, Repository } from "typeorm"
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { FindAllStudentService } from "../../../domain-services/student/findAll/findAll.student.service";
import { FindAllStudentDto } from "../../../domain-services/student/findAll/findAll.student.dto";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";


describe('FindAllStudents', () => {

    let appDataSource: DataSource;
    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;
    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    })

    it('should repositories be instantiated', () => {
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined();
    });

    it("should find all students", async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await parentRepository.create(studentEntity.parents[0])).toBeInstanceOf(ParentEntity);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        const service = new FindAllStudentService(studentRepository);
        const students = await service.execute();
        expect(students).toBeInstanceOf(FindAllStudentDto);
        expect(students.all).toBeInstanceOf(Array);
        expect(students.all[0].name).toBe(student.getName());
    });

    it("should find an empty list", async () => {
        const service = new FindAllStudentService(studentRepository);
        const students = await service.execute();
        expect(students).toBeInstanceOf(FindAllStudentDto);
        expect(students.all.length).toBe(0);
    });

});