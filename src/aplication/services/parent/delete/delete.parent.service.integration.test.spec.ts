import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { DeleteParentService } from './delete.parent.service';
import { DataSource } from "typeorm";
import { Repository } from "typeorm";

describe('DeleteParentService integration tests', () =>{

    let appDataSource: DataSource;

    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;

    beforeEach( async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
        
        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('entitites and repositories must be instantiated', async () =>{
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined();
    });

    it('should not delete a parent with invalid id', async () =>{
        // TODO FIX THE TEST
        let parent = DomainMocks.mockParent()
        let students = parent.getStudents()

        let studentEntity = StudentEntity.toStudentEntity(students[0]);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let parentEntity = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        let result = await parentRepository.findAll();
        expect(result.length).toBe(1);

        let wantedId = 'e9c826b0-2fb4-41a7-aae8-8eed8fa999e8';
        const service = new DeleteParentService(parentRepository);
        expect(await service.execute(wantedId)).toBe(void 0);
         result = await parentRepository.findAll();
        expect(result.length).toBe(1);
    })

    it('should delete a parent', async () =>{
        let parent = DomainMocks.mockParentWithoutStudent()
        let students = [DomainMocks.mockStudentWithoutParent()];
        parent.setStudents(students);
        students[0].setParents(parent);

        let studentEntity = StudentEntity.toStudentEntity(students[0]);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let parentEntity = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        let wantedId = parent.getId();
        const service = new DeleteParentService(parentRepository);
        expect(await service.execute(wantedId)).toBe(void 0);
        let result = await parentRepository.findAll();
        expect(result.length).toBe(0);
    });

})