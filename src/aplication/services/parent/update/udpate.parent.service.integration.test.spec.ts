import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { Student } from "../../../domain/student/student";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { UpdateParentService } from "./update.parent.service";

describe('UpdateParentService integration tests', () =>{

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

    it('repositories and entities must be instantiated', async () =>{
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined();
    });

    it('should throw an SystemError when using a non-existent id to update a parent', async () =>{
        const noExistentParentId = '65b7d0ff-4f7f-4402-be23-2eb809a7bebc';
        const service = new UpdateParentService(parentRepository);
        const student = DomainMocks.mockStudent();
        const studentEntity = StudentEntity.toStudentEntity(student);
        try {
            await service.execute(studentEntity, noExistentParentId);
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{context: 'parent', message: 'Parent not found'}]);
        }
    });

    it('should add another student to parent', async () =>{
        // TODO FIX THE TEST
        const parent = DomainMocks.mockParent();
        const parentEntity = ParentEntity.toParentEntity(parent);

        const student = parent.getStudents()[0];
        const studentEntity = StudentEntity.toStudentEntity(student);

        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        let results = await parentRepository.findAll();
        expect(results[0].students.length).toBe(1);

        const another = new Student({ birthday: new Date(), name: 'another', enrolled: '123', nameParents: [parent.getName()], id: '5c51dad3-c1a8-45b6-a846-2ec441686b62'});
        const anotherEntity = StudentEntity.toStudentEntity(another);
        expect(await studentRepository.create(anotherEntity)).toBeInstanceOf(StudentEntity);
        parentEntity.students.push(anotherEntity)
        const wantedParentId = parentEntity.id;
        const service = new UpdateParentService(parentRepository);
        expect(await service.execute(anotherEntity, wantedParentId));
        results = await parentRepository.findAll();
        expect(results[0].students.length).toBe(2);

    });

});