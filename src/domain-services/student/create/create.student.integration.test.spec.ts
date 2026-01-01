import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { ClassRepository } from "../../../infrastructure/repositories/class/class.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { CreateStudentService } from '../create/create.student.service';
import { CreateStudentDto } from '../create/create.student.dto';
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { ParentRepository } from '../../../infrastructure/repositories/parent/parent.repository';
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { DataSource } from "typeorm";

describe('CreateStudentService integration tests', () => {
    let appDataSource: DataSource;
    let studentEntity;
    let studentRepository: StudentRepository;
    let schoolGroupEntity;
    let schoolGroupRepository: ClassRepository;
    let parentEntity;
    let parentRepository: ParentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
        schoolGroupEntity = appDataSource.getRepository(ClassEntity);
        schoolGroupRepository = new ClassRepository(schoolGroupEntity, appDataSource);
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.destroy();
    });

    it('repositories must be instantiated', () =>{
        expect(studentRepository).toBeDefined();
        expect(schoolGroupRepository).toBeDefined();
    });

    it('should throw a SystemError if schollgroup not found', async () =>{
        let parent = DomainMocks.mockParent();
        parent.setStudents([])
        let parentModel = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentModel)).toBeInstanceOf(ParentEntity);

        let dto = new CreateStudentDto(new Date(), 'edson', '123', [parent.getId()]);
        const service = new CreateStudentService(studentRepository, schoolGroupRepository, parentRepository);

        try {
            await service.execute(dto);
        } catch (error) {   
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors.length).toBe(1);
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'student', message: 'Schoolgroup not found' }]);
        }

    })

    it('should throw a SystemError if parent not found', async () =>{
        let schoolgroup = DomainMocks.mockSchoolGroup();
        let sgEntity = ClassEntity.toClassEntity(schoolgroup);
        expect(await schoolGroupRepository.create(sgEntity)).toBeInstanceOf(ClassEntity);

        let dto = new CreateStudentDto(new Date(), 'edson', schoolgroup.getClassCode(), ['394bc902-4ab4-4631-916f-46e9728a6534']);
        const service = new CreateStudentService(studentRepository, schoolGroupRepository, parentRepository);

        try {
            await service.execute(dto);
        } catch (error) {   
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors.length).toBe(1);
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'student', message: 'At least one parent must be informed' }]);
        }

    });

    it('should throw a SystemError if parent and schoolgroup not found', async () =>{ 
        let dto = new CreateStudentDto(new Date(), 'edson', '123', ['394bc902-4ab4-4631-916f-46e9728a6534']);
        const service = new CreateStudentService(studentRepository, schoolGroupRepository, parentRepository);
        try {
            await service.execute(dto);
        } catch (error) {   
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors.length).toBe(2);
            //@ts-ignore
            expect(error.errors).toMatchObject([
                { context: 'student', message: 'Schoolgroup not found' },
                { context: 'student', message: 'At least one parent must be informed' }
            ]);
        }
    })

    it('should throw a SystemError if student invalid', async () =>{ 
        let parent = DomainMocks.mockParent();
        parent.setStudents([]);
        let parentModel = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentModel)).toBeInstanceOf(ParentEntity);

        let schoogroup = DomainMocks.mockSchoolGroup();
        let sgEntity = ClassEntity.toClassEntity(schoogroup);
        expect(await schoolGroupRepository.create(sgEntity)).toBeInstanceOf(ClassEntity);

        let enrolled: any;
        let dto = new CreateStudentDto(new Date(), 'edson', enrolled, [parent.getId()]);
        const service = new CreateStudentService(studentRepository, schoolGroupRepository, parentRepository);
        try {
            await service.execute(dto);
        } catch (error) {
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors.length).toBe(1);
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'student', message: 'Enrolled should not be null' }]);
        }

    })

    it('should create a student', async () =>{ 
        let parent = DomainMocks.mockParent();
        parent.setStudents([]);
        let parentModel = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(parentModel)).toBeInstanceOf(ParentEntity);

        let schoogroup = DomainMocks.mockSchoolGroup();
        let sgEntity = ClassEntity.toClassEntity(schoogroup);
        expect(await schoolGroupRepository.create(sgEntity)).toBeInstanceOf(ClassEntity);

        let dto = new CreateStudentDto(new Date(), 'edson', schoogroup.getClassCode(), [parent.getId()]);
        const service = new CreateStudentService(studentRepository, schoolGroupRepository, parentRepository);
        expect(await service.execute(dto)).toBe(void 0);

    });

});