import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { ClassEntity } from "../../../../infrastructure/entities/class/class.entity";
import { ParentEntity } from "../../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../../infrastructure/entities/student/student.entity";
import { StudentRepository } from "../../../../infrastructure/repositories/student/student.repository";
import { UpdateStudentDto } from '../update/udpate.student.dto';
import { UpdateStudentService } from '../update/udpate.student.service';

describe('UpdateStudentService integration tests', () => {
    let appDataSource: DataSource;
    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSource.getAppDataSource();
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

    it('should throw a SystemError if student not found', async () => {
        const wantedId = 'fe62e23d-1685-4e68-b9f9-480f46772e01';
        const dto = new UpdateStudentDto(wantedId, '1234');
        const service = new UpdateStudentService(studentRepository);

        try {
            await service.execute(dto);
        } catch (error) {
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ context: 'student', message: 'student not found' }]);
        }

    });

    it('should update a student in database', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);
        let updatedErroled = '987';
        const service = new UpdateStudentService(studentRepository);
        const dto = new UpdateStudentDto(student.getId(), updatedErroled);
        expect(await service.execute(dto)).toBe(void 0);
        const updatedStudent = await studentRepository.find(student.getId());
        expect(updatedStudent.enrolled).toBe(updatedErroled)
    });
});