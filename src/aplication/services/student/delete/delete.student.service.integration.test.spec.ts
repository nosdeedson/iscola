import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../infrastructure/repositories/student/student.repository";
import { DeleteStudentService } from '../delete/delete.student.service';

describe('DeleteStudentService integraton tests', () => {
    let appDataSource: DataSource;
    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;
    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));

        studentEntity = appDataSource.getRepository(StudentEntity);
        studentRepository = new StudentRepository(studentEntity, appDataSource);
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
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
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
    });

    it('should not throw a SystemError if id does not exist', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let noExixtentId = 'ddb5186b-9a8d-4c5d-8086-2cccc0499c11';
        const service = new DeleteStudentService(studentRepository);
        expect(await service.execute(noExixtentId)).toBe(void 0);
    })

    it('should not throw a SystemError if id does not exist', async () => {
        let student = DomainMocks.mockStudent();
        let studentEntity = StudentEntity.toStudentEntity(student);
        expect(await studentRepository.create(studentEntity)).toBeInstanceOf(StudentEntity);

        let wantedId = student.getId();
        const service = new DeleteStudentService(studentRepository);
        expect(await service.execute(wantedId)).toBe(void 0);

        const fromBD = await studentRepository.find(wantedId);
        expect(fromBD).toBeNull();
    });
});