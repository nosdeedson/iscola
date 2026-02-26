import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from '../../../../infrastructure/entities/academic-semester/academic.semester.entity';
import { MockRepositoriesForUnitTest } from '../../../../infrastructure/__mocks__/mockRepositories';
import { FindCurrentSemesterService } from './find-current-semester.service';

describe('FindCurrentSemesterService unit test', () => {

    it('should find the current semester', async () => {
        const semester = DomainMocks.mockAcademicSemester();
        const semesterEntity = AcademicSemesterEntity.toAcademicSemester(semester);
        const repository = MockRepositoriesForUnitTest.mockRepositories();
        repository.findCurrentSemester = jest.fn().mockImplementation(() => Promise.resolve(semesterEntity));
        const service = new FindCurrentSemesterService(repository);
        const result = await service.execute();
        expect(result).toBeInstanceOf(AcademicSemesterEntity);
        expect(result.actual).toBeTruthy();
    });
});