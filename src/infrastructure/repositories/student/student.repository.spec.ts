import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { ClassEntity } from "../../entities/class/class.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { ParentStudentEntity } from "../../entities/parent-student/parent.student.entity";
import { StudentRepository } from '../../repositories/student/student.repository';
import { ParentRepository } from '../../repositories/parent/parent.repository';
import { ParentStudentRepository } from '../../repositories/parent-student/parent.student.repositoy';
import { ClassRepository } from '../../repositories/class/class.repository';
import { Class } from "../../../domain/class/class";
import { PersonEntity } from "../../entities/@shared/person.entity";
import { Student } from "../../../domain/student/student";
import { DataSource } from "typeorm";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { Parent } from "../../../domain/parent/parent";

const MILISECONDS = 1000;

describe('StudentRepository unit test', () => {

    let appDataSource: DataSource;
    let studentModel;
    let studentRepository: StudentRepository;
    let schoolGroupModel;
    let schoolGroupRepository: ClassRepository;
    let parentModel;
    let parentRepository: ParentRepository;
    let parentStudentModel;
    let parentStudentRepository: ParentStudentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
        schoolGroupModel = appDataSource.getRepository(ClassEntity);
        schoolGroupRepository = new ClassRepository(schoolGroupModel, appDataSource);
        parentModel = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentModel, appDataSource);
        parentStudentModel = appDataSource.getRepository(ParentStudentEntity);
        parentStudentRepository = new ParentStudentRepository(parentStudentModel);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();

        await appDataSource.destroy();
    });

    it('studentRepository should instantiated', () => {
        expect(studentRepository).toBeDefined();
        expect(schoolGroupRepository).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(parentStudentRepository).toBeDefined();
    });

    it('should save a student in BD', async () => {
        let student = DomainMocks.mockStudentWithoutParent();
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

    it('should find all students by names in BD', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let parent1 = new Parent({ name: 'Test', birthday: new Date(), nameStudents: [] });

        let parentEntity = ParentEntity.toParentEntity(parent);
        let parentEntity1 = ParentEntity.toParentEntity(parent1);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);
        expect(await parentRepository.create(parentEntity1)).toBeInstanceOf(ParentEntity);

        const student = DomainMocks.mockStudentWithoutParent();
        const student2 = DomainMocks.mockStudentWithoutParent();
        const studentEntity = StudentEntity.toStudentEntity(student);
        const studentEntity2 = StudentEntity.toStudentEntity(student2);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        expect(await studentRepository.create(studentEntity2)).toBeInstanceOf(StudentEntity);
        const parentStudent = new ParentStudentEntity();
        parentStudent.parent = parentEntity;
        parentStudent.student = studentEntity;
        parentStudent.id = '31e135ee-18fe-47a1-ad6e-0bc29762f3a1';
        expect(await parentStudentRepository.save(parentStudent));
        const parentStudent2 = new ParentStudentEntity();
        parentStudent2.parent = parentEntity1;
        parentStudent2.student = studentEntity2;
        parentStudent2.id = '18294dcd-eca2-42dd-bf7e-29782b27974a';
        expect(await parentStudentRepository.save(parentStudent2));
        let results = await parentRepository.findByNames([parent.getName(), parent1.getName()], [student.getName(), student2.getName()]);
        expect(results.length).toBe(2);
        expect(results[0].id).toBe(parentEntity.id);
        expect(results[1].id).toBe(parentEntity1.id);
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