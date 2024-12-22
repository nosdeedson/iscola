import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { InputCreateAcademicSemesterDto } from './academic-semester.dto';
import { CreateAcademicSemesterService } from './create.academic-semester.service';

describe('Academic semester service unit test', () => {

    let semester: InputCreateAcademicSemesterDto;
    let semesterWithSameDate: InputCreateAcademicSemesterDto;
    let beggningWeekend = new Date(2024, 8, 29, 10, 59, 59);
    let beggningWeekDay = new Date(2024, 8, 30, 10, 59, 59);
    let endingWeekend = new Date(2024, 10, 30, 10, 59, 59);
    let endingWeekDay = new Date(2024, 10, 29, 10, 59, 59);


    beforeEach(() => {
        semester = {
            beginningDate: new Date(2024, 8, 30, 10, 59, 59),
            endingDate: new Date(2024, 10, 29, 10, 59, 59)
        };
        semesterWithSameDate = {
            beginningDate: new Date(2024, 9, 30, 10, 59, 59),
            endingDate: new Date(2024, 9, 30, 10, 59, 59)
        }

    });

    it('should create a semester', async () =>{
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateAcademicSemesterService(semesterRepository);
        expect(await usecase.execute(semester)).toBe(void 0);
        expect(semesterRepository.create).toHaveBeenCalled();
        expect(semesterRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw en error when creating a semester with beggning and end of the semester using same date', async () =>{
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateAcademicSemesterService(semesterRepository);
        try {
            await usecase.execute(semesterWithSameDate);
        } catch (error) {
            expect(error.errors[0].message).toBe('the beggning and the end of the semester can not be equal')
        }
        expect(semesterRepository.create).toHaveBeenCalledTimes(0);
    });

    it('should throw en error when creating a semester with beggning on weekend', async () =>{
        let semesterDateBeginWrong = {
            beginningDate: beggningWeekend,
            endingDate: endingWeekDay
        }
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateAcademicSemesterService(semesterRepository);
        try {
            await usecase.execute(semesterDateBeginWrong);
        } catch (error) {
            expect(error.errors[0].message).toBe('the academicSemester must start in a weekday')
        }
        expect(semesterRepository.create).toHaveBeenCalledTimes(0);
    });

    it('should throw en error when creating a semester with ending on weekend', async () =>{
        let semesterDateBeginWrong = {
            beginningDate: beggningWeekDay,
            endingDate: endingWeekend
        }
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateAcademicSemesterService(semesterRepository);
        try {
            await usecase.execute(semesterDateBeginWrong);
        } catch (error) {
            expect(error.errors[0].message).toBe('the academicSemester must end in a weekday')
        }
        expect(semesterRepository.create).toHaveBeenCalledTimes(0);
    });

    it('should have two errors', async () =>{
        let semesterDateBeginWrong = {
            beginningDate: new Date(2024, 9, 3, 10, 59,58),
            endingDate: new Date(2024, 8, 30, 10, 59,58)
        }
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        const usecase = new CreateAcademicSemesterService(semesterRepository);
        try {
            await usecase.execute(semesterDateBeginWrong);
        } catch (error) {
            expect(error.errors[0].message).toBe('the beginning date must be before ending date');
            expect(error.errors[1].message).toBe('the ending date must be after beginning date');
            expect(error.errors.length).toBe(2)
        }
        expect(semesterRepository.create).toHaveBeenCalledTimes(0);
    });

})