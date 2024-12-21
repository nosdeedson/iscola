import { AppDataSourceMock } from '../../../infrastructure/__mocks__/appDataSourceMock';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';
import { StudentEntity } from '../../../infrastructure/entities/student/student.entity';
import { ParentRepository } from '../../../infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from '../../../infrastructure/repositories/student/student.repository';
import { FindAllParentUseCase } from './findAll.parent.usecase';


describe('FindAllParentUseCase integration tests', () =>{

    let appDataSource;

    let parentEntity;
    let parentRepository;

    let studentEntity;
    let studentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
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

    it('should find an empty array', async () =>{
        const usecase = new FindAllParentUseCase(parentRepository);

        const results = await usecase.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0);
    })

    it('should find an array with one parent', async () =>{
        const parent = DomainMocks.mockParent();
        const entity = ParentEntity.toParentEntity(parent);
        const student = parent.getStudents()[0];

        const studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        expect(await parentRepository.create(entity)).toBe(void 0);

        const usecase = new FindAllParentUseCase(parentRepository);

        const results = await usecase.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(1);
        expect(results.all[0].id).toBe(parent.getId());
    })

})