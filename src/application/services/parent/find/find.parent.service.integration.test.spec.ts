import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from "../../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../../infrastructure/repositories/student/student.repository";
import { FindParentService } from './find.parent.service';

describe('FindParentService integration tests ', () =>{

    let appDataSource: DataSource;

    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSource.getAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
        
        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('entitites and repositories must be instantiated', async () =>{
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined();
    })

    it('should not find a parent passing a non-existent id', async () =>{
        let parent = DomainMocks.mockParent()
        let students = parent.getStudents();

        let studentEntity = StudentEntity.toStudentEntity(students[0]);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let parentEntity = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        const wantedId = 'e9c826b0-2fb4-41a7-aae8-8eed8fa999e8';

        const service = new FindParentService(parentRepository);
        try {
            let result = await service.execute(wantedId);
        } catch (error) {
            //@ts-ignore
            expect(error.errors).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{context: 'parent', message: 'Parent not found'}])
        }
    })

    it('should find a parent', async () =>{
        let parent = DomainMocks.mockParentWithoutStudent()
        let students = [DomainMocks.mockStudentWithoutParent()];
        parent.setStudents(students);
        students[0].setParents(parent);

        let studentEntity = StudentEntity.toStudentEntity(students[0]);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let parentEntity = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        const wantedId = parent.getId();

        const service = new FindParentService(parentRepository);
        let result = await service.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.name).toBe(parent.getName());
    });


})