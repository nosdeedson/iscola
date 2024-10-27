import { DomainMocks } from '../../../infrastructure/__mocks__/mocks'
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories'
import { DeleteAcademicSemesterUseCase } from '../../academic-semester/delete/delete.academic-semester.usecase';

describe('delete academic semester unit test', () =>{

    let semester;

    beforeEach(() => {
        semester = DomainMocks.mockAcademicSemester();
    });

    it('should delete an academic semester', async () => {
        const semesterRepository = await MockRepositoriesForUnitTest.mockRepositories();
        const useCase = new DeleteAcademicSemesterUseCase(semesterRepository);
        expect(await useCase.execute(semester.getId())).toBe(void 0);
        expect(semesterRepository.delete).toHaveBeenCalledTimes(1)
    })

})