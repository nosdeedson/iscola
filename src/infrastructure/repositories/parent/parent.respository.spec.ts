import { DataSource } from "typeorm";
import { Parent } from "../../../domain/parent/parent";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { ParentRepository } from '../parent/parent.repository';
import { StudentRepository } from '../student/student.repository';
import { StudentEntity } from "../../entities/student/student.entity";
import { ParentStudentEntity } from "../../entities/parent-student/parent.student.entity";
import { ParentStudentRepository } from "../../repositories/parent-student/parent.student.repositoy";


describe('ParentRepository unit test', () =>{

    let appDataSource: DataSource;
    let parentModel;
    let parentRepository: ParentRepository;
    let studentModel;
    let studentRepository: StudentRepository;

    let parentStudentModel;
    let parentStudentRepository: ParentStudentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentModel = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentModel, appDataSource);
        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
        parentStudentModel = appDataSource.getRepository(ParentStudentEntity);
        parentStudentRepository = new ParentStudentRepository(parentStudentModel);
    });

    afterEach( async () =>{
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.destroy();
    })

    it('repository should be instantiate', () => {
        expect(parentRepository).toBeDefined();
    });

    it('should save a parent model to the BD', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let model = ParentEntity.toParentEntity(parent);
        let wantedId = parent.getId();

        expect(await parentRepository.create(model)).toBeInstanceOf(ParentEntity);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should delete a parent model to the BD', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let model = ParentEntity.toParentEntity(parent);
        let wantedId = parent.getId();
        await parentRepository.create(model);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        
        expect(await parentRepository.delete(wantedId)).toBe(void 0);
        result = await parentRepository.find(wantedId);
        expect(result).toBeNull();
    });

    it('should not throw an error while finding a parent with no-existent id', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let model = ParentEntity.toParentEntity(parent);

        let wantedId = '6a0e9000-c5f9-4dad-bd4a-e4642964c2fb';
        await parentRepository.create(model);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(await parentRepository.delete(wantedId)).toBe(void 0);
        result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();

    });

    it('should find a parent model to the BD', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let model = ParentEntity.toParentEntity(parent);
        let wantedId = parent.getId();
        await parentRepository.create(model);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should find all parent model to the BD', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let parent1 = new Parent({name: 'test', nameStudents: [], birthday: new Date()});

        let parentEntity = ParentEntity.toParentEntity(parent);
        let parentEntity1 = ParentEntity.toParentEntity(parent1);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);
        expect(await parentRepository.create(parentEntity1)).toBeInstanceOf(ParentEntity);

        let results = await parentRepository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
        expect(results[0].id).toBe(parent.getId());
        expect(results[1].id).toBe(parent1.getId());
        
    });

    it('should find parents by name', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let parent1 = new Parent({name: 'Test', birthday: new Date(), nameStudents: []});

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

    it('should update a parent model to the BD', async () => {
        let parent = DomainMocks.mockParentWithoutStudent();
        let model = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(model)).toBeInstanceOf(ParentEntity);
        const expectedBirthDay = new Date(2025, 12, 25)
        model.birthday = expectedBirthDay;

        expect(await parentRepository.update(model)).toBe(void 0);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(result.birthday.toLocaleDateString()).toBe(expectedBirthDay.toLocaleDateString());
    });

});