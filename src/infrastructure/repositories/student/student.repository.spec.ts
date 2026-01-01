import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { ClassEntity } from "../../entities/class/class.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { StudentRepository } from '../../repositories/student/student.repository';
import { ClassRepository } from '../../repositories/class/class.repository';
import { Class } from "../../../domain/class/class";
import { PersonEntity } from "../../entities/@shared/person.entity";
import { Student } from "../../../domain/student/student";
import { DataSource } from "typeorm";

const MILISECONDS = 1000;

describe('StudentRepository unit test', () =>{

    let appDataSource: DataSource;
    let studentModel;
    let studentRepository: StudentRepository;
    let schoolGroupModel;
    let schoolGroupRepository: ClassRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
        schoolGroupModel = appDataSource.getRepository(ClassEntity);
        schoolGroupRepository = new ClassRepository(schoolGroupModel, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();

        await appDataSource.destroy();
    });

    it('studentRepository should instantiated', () =>{
        expect(studentRepository).toBeDefined();
        expect(schoolGroupRepository).toBeDefined();
    });

    it('should save a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        expect(await studentRepository.create(model)).toBeInstanceOf(StudentEntity);
        
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should delete a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        expect(await studentRepository.create(model)).toBeInstanceOf(StudentEntity);
        
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();

        expect(await studentRepository.delete(wantedId)).toBe(void 0);
        result = await studentRepository.find(wantedId);

        expect(result).toBeNull();
    });

    it('should find a student in BD', async () => {
        let student = DomainMocks.mockStudent();
        let model = StudentEntity.toStudentEntity(student);
        let wantedId = student.getId();
        expect(await studentRepository.create(model)).toBeInstanceOf(StudentEntity);
        
        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
    });

    it('should find all students by ids in BD', async () => {
        let student1 = DomainMocks.mockStudent();
        let model1 = StudentEntity.toStudentEntity(student1);
        expect(await studentRepository.create(model1)).toBeInstanceOf(StudentEntity);

        let student2 = new Student(new Date, 'edson', '123', student1.getParents(), '90be2abb-f2da-46c0-9fc8-520c988b34f9');
        let model2 = StudentEntity.toStudentEntity(student2);
        expect(await studentRepository.create(model2)).toBeInstanceOf(StudentEntity);
        
        let wantedIds = [student1.getId(), '90be2abb-f2da-46c0-9fc8-520c988b34f9'] as any;

        let results = await studentRepository.findStudentsByIds(wantedIds)
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
        expect(wantedIds).toContain(results[0].id);
        expect(wantedIds).toContain(results[1].id);
    });


    it('should update a student in BD', async () => {
        // schoogroup to student
        let schoolGroup = DomainMocks.mockSchoolGroup();
        let schoolGroupModel = ClassEntity.toClassEntity(schoolGroup);
        await schoolGroupRepository.create(schoolGroupModel);

        // create student
        let student = DomainMocks.mockStudent();
        student.setSchoolGroup(schoolGroup);
        let wantedId = student.getId();
        let model = StudentEntity.toStudentEntity(student);
        
        expect(await studentRepository.create(model)).toBeInstanceOf(StudentEntity);

        let result = await studentRepository.find(wantedId);
        expect(result).toBeDefined();

        let schedule = DomainMocks.mockSchedule();
        let schoolGroup1 = new Class('4321', 'b1', 'b1', schedule, '6f76562a-b91f-43e7-89fd-60151436371c')
        let wantedSchoolGroupId = '6f76562a-b91f-43e7-89fd-60151436371c';
        let schoolGroupModel1 = ClassEntity.toClassEntity(schoolGroup1);
        await schoolGroupRepository.create(schoolGroupModel1);

        let newSchoolGroup = await schoolGroupRepository.find(wantedSchoolGroupId);
        result.schoolGroup = newSchoolGroup;
        expect(await studentRepository.update(result)).toBe(void 0);

        result = await studentRepository.find(result.id);
        expect(result).toBeDefined();
        expect(result.schoolGroup.classCode).toEqual(schoolGroup1.getClassCode());
    });
});