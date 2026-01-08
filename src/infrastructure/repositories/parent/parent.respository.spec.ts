import { DataSource } from "typeorm";
import { Parent } from "../../../domain/parent/parent";
import { Student } from "../../../domain/student/student";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { PersonEntity } from "../../entities/@shared/person.entity";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { ParentRepository } from '../parent/parent.repository'; 
import { StudentRepository } from '../student/student.repository';


describe('ParentRepository unit test', () =>{

    let appDataSource: DataSource;
    let parentModel;
    let parentRepository: ParentRepository;
    let studentModel;
    let studentRepository: StudentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentModel = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentModel, appDataSource);
        studentModel = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentModel, appDataSource);
    });

    afterEach( async () =>{
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.destroy();
    })

    it('repository should be instantiate', () => {
        expect(parentRepository).toBeDefined();
    });

    it('should save a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentEntity(parent);
        let wantedId = parent.getId();

        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        expect(await parentRepository.create(model)).toBeInstanceOf(ParentEntity);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should delete a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentEntity(parent);

        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let wantedId = parent.getId();
        await parentRepository.create(model);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();

        expect(await parentRepository.delete(wantedId)).toBe(void 0);
    });

    it('should not throw an error while finding a parent with no-existent id', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentEntity(parent);

        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        let wantedId = '6a0e9000-c5f9-4dad-bd4a-e4642964c2fb';
        await parentRepository.create(model);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(await parentRepository.delete(wantedId)).toBe(void 0);
        result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();

    });

    it('should find a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentEntity(parent);
        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        let wantedId = parent.getId();
        await parentRepository.create(model);

        let result = await parentRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
    });

    it('should find all parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let parent1 = new Parent(new Date(), 'test', [parent.getStudents()[0]])

        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

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

    it('should find parents by ids', async () => {
        let parent = DomainMocks.mockParent();
        let parent1 = new Parent(new Date(), 'test', [parent.getStudents()[0]])

        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let parentEntity = ParentEntity.toParentEntity(parent);
        let parentEntity1 = ParentEntity.toParentEntity(parent1);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);
        expect(await parentRepository.create(parentEntity1)).toBeInstanceOf(ParentEntity);

        let results = await parentRepository.findByNames([parent.getName(), parent1.getId()]);

        expect(results.length).toBe(2);
    });

    it('should update a parent model to the BD', async () => {
        let parent = DomainMocks.mockParent();
        let model = ParentEntity.toParentEntity(parent);
        let student = parent.getStudents()[0];
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        expect(await parentRepository.create(model)).toBeInstanceOf(ParentEntity);

        let anotherStudent = new Student(new Date, 'edson', '123', [parent], '8bb648b2-c0be-4164-a01a-9465d22aa269');
        let anotherStudentEntity = StudentEntity.toStudentEntity(anotherStudent);

        expect(await studentRepository.create(anotherStudentEntity)).toBeInstanceOf(StudentEntity);

        model.students.push(anotherStudentEntity);

        expect(await parentRepository.update(model)).toBe(void 0);
        let result = await parentRepository.find(parent.getId());
        expect(result).toBeDefined();
        expect(result.students.length).toBe(2);
    });

});