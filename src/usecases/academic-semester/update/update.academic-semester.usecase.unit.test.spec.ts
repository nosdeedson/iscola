import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories"
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { UpdateAcademicSemesterUseCase } from '../update/update.academic-semester.usecase';
import { UpdateAcademicSemesterDto } from "./udpate.academic-semester.dto";

describe('AcademicSemester unit tests', () =>{

    let semester;
    let entity;
    let dto;

    beforeEach(async () =>{
        semester = DomainMocks.mockAcademicSemester();
        entity = AcademicSemesterEntity.toAcademicSemester(semester);
    })

    afterEach(async () => {
        semester = null;
        entity = null;
    })

    it('should update an academicSemester', async () => {
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        semesterRepository.update = jest.fn()
            .mockReturnValue(await Promise.resolve(void 0));
        semesterRepository.find = jest.fn()
            .mockReturnValue(await Promise.resolve(entity));
        
        
        dto = new UpdateAcademicSemesterDto(semester.getId(), false);
        
        const useCase = new UpdateAcademicSemesterUseCase(semesterRepository);
        expect(await useCase.execute(dto)).toBe(void 0);
        let result = semesterRepository.find(semester.getId());
        expect(result.actual).toBeFalsy();
    });

    it('given wrong id should not update an academicSemester', async () => {
        const semesterRepository = MockRepositoriesForUnitTest.mockRepositories();
        semesterRepository.update = jest.fn()
            .mockReturnValue(await Promise.resolve(void 0));
            semesterRepository.update = jest.fn().mockRejectedValueOnce(await Promise.resolve(null))
            
            let worngId = '1234';
            
            dto = new UpdateAcademicSemesterDto(worngId, false);
            const useCase = new UpdateAcademicSemesterUseCase(semesterRepository);
            expect(await useCase.execute(dto)).toBe(void 0);
            semesterRepository.find = jest.fn()
                .mockReturnValue(await Promise.resolve(entity));
        let result = semesterRepository.find(semester.getId());
        expect(result.actual).toBeTruthy();
    });
})