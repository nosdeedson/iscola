import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { FindAcademicSemesterUseCase } from "./find.academic-semester.usecase";



describe('find academic semester unit test', () =>{
    let semester;

    beforeEach(async () => {
        semester = DomainMocks.mockAcademicSemester();
    })

    afterEach( async () => {
        semester = null;
        jest.clearAllMocks();
    })

    it('should find an academicSemester', async () =>{
        const semesterRepository = await MockRepositoriesForUnitTest.mockRepositories();
        semesterRepository.find = jest.fn().mockImplementationOnce(() => {
            return semester
        });
        let wantedId = semester.getId();
        const useCase = new FindAcademicSemesterUseCase(semesterRepository);
        let result = await useCase.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.beginningDate).toBe(semester.getBeginningDate());
        expect(result.endingDate).toBe(semester.getEndingDate());
        expect(semesterRepository.find).toHaveBeenCalledTimes(1)
        expect(semesterRepository.find).toHaveBeenCalledWith(wantedId)
    })

    it('should not find an academicSemester with the worng id', async () =>{
        let beginningDate = new Date(2024, 9, 11, 10, 0, 0);
        let endingDate = new Date(2024, 11, 11, 10, 0, 0);
        const semesterRepository = await MockRepositoriesForUnitTest.mockRepositories();
        semesterRepository.find = jest.fn().mockImplementationOnce(() => {
            return null;
        });
        const useCase = new FindAcademicSemesterUseCase(semesterRepository);
        try {
            let result = await useCase.execute('4321');
        } catch (error) {
            expect(error.errors[0].message).toBe('Academic Semester not found');
        }
        expect(semesterRepository.find).toHaveBeenCalledTimes(1)
        expect(semesterRepository.find).toHaveBeenCalledWith('4321')
    })
})