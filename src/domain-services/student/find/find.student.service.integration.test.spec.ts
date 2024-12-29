import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { FindStudentService } from '../find/find.student.service';


describe('FindStudentService integration tests', () => {
    let appDataSource;
    let studentEntity;
    let studentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
    });

    afterEach(async () => {
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(StudentEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.destroy();
    });

    it('repositories must be instantiated', () => {
        expect(studentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();
    });

    it('should throw a SystemError if student does not exisit', async () =>{
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let noExixtentId = 'ddb5186b-9a8d-4c5d-8086-2cccc0499c11';
        const service = new FindStudentService(studentRepository);
        try {
            await service.execute(noExixtentId);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'student', message: 'student not found'}]);
            expect(error.errors.length).toBe(1)
        }
    })

    it('should a student', async () =>{
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBe(void 0);

        let wantedId = student.getId();
        const service = new FindStudentService(studentRepository);
        let result = await service.execute(wantedId)
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.name).toBe(student.getName());
        expect(result.enrolled).toBe(student.getEnrolled());
    })
})