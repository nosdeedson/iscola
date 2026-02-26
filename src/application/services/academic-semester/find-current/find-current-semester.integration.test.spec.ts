import { Repository } from "typeorm";
import { AcademicSemesterEntity } from "../../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from "../../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { TestDataSource } from "../../../../infrastructure/repositories/config-test/test.datasource";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";

describe('FindCurrentSemesterService integration test', () => {

    let semesterEntity: Repository<AcademicSemesterEntity>;
    let semesterRepository: AcademicSemesterRepository;

    beforeAll( async () => {
        semesterEntity = TestDataSource.getRepository(AcademicSemesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterEntity, TestDataSource);
    });

    it('repository should be defined', async () => {
        expect(semesterRepository).toBeDefined();
    });

    it('should find the current semester', async () => {
        const semester = DomainMocks.mockAcademicSemester();
        const semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(semesterEntity)).toBeInstanceOf(AcademicSemesterEntity);

        const result = await semesterRepository.findCurrentSemester();
        expect(result).toBeInstanceOf(AcademicSemesterEntity);
        expect(result.actual).toBeTruthy();
    });

});