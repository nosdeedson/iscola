import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { Student } from "../../../../domain/student/student";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { ParentEntity } from "../../../../infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "../../../../infrastructure/entities/student/student.entity";
import { ParentRepository } from "../../../../infrastructure/repositories/parent/parent.repository";
import { StudentRepository } from "../../../../infrastructure/repositories/student/student.repository";
import { UpdateParentService } from "./update.parent.service";

describe('UpdateParentService integration tests', () => {

    let appDataSource: DataSource;

    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    let studentEntity: Repository<StudentEntity>;
    let studentRepository: StudentRepository;

    beforeEach(async () => {
        appDataSource = AppDataSource.getAppDataSource();
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

    it('repositories and entities must be instantiated', async () => {
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
        expect(studentEntity).toBeDefined();
        expect(studentRepository).toBeDefined();
    });

    it('should throw an SystemError when using a non-existent id to update a parent', async () => {
        const noExistentParentId = '65b7d0ff-4f7f-4402-be23-2eb809a7bebc';
        const service = new UpdateParentService(parentRepository);
        const student = DomainMocks.mockStudent();
        const studentEntity = StudentEntity.toStudentEntity(student);
        await expect(service.execute(new Date(), 'any name', noExistentParentId))
            .rejects.toMatchObject({
                errors: [{
                    context: 'parent',
                    message: 'Parent not found'
                }]
            });
    });

    it('should update a parent with birthday', async () => {
        const parent = DomainMocks.mockParent();    
        const parentEntity = ParentEntity.toParentEntity(parent);
        parentEntity.birthday = null as any;
        expect(await parentRepository.create(parentEntity)).toBeInstanceOf(ParentEntity);

        let results = await parentRepository.findAll();
        expect(results.length).toBe(1);
        const wantedParentId = results[0].id;
        const service = new UpdateParentService(parentRepository);
        const wantedName = parent.getName();
        const wantedBirthday = new Date();
        expect(await service.execute(wantedBirthday, wantedName, wantedParentId));
        results = await parentRepository.findAll();
        expect(results[0].fullName).toBe(wantedName);
        expect(results[0].birthday.getTime()).toBe(wantedBirthday.getTime());
    });

});