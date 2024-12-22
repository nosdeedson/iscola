import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { FindAllAcademicSemesterService } from './findAll.academic-semester.service';

describe('findAll service unit tests', () =>{
    
    it('should receive an empty array of semester', async () =>{
        const semesterRepository = await MockRepositoriesForUnitTest.mockRepositories();
        semesterRepository.findAll = jest.fn()
            .mockImplementationOnce(() =>{
                return []
            })
        const service = new FindAllAcademicSemesterService(semesterRepository);
        let results = await service.execute();
        expect(results.all.length).toBe(0);
        expect(semesterRepository.findAll).toHaveBeenCalledTimes(1)
    })

    it('should receive an array of semester', async () =>{
        let beginningDate = new Date(2024, 9, 11, 10, 0, 0);
        let beginningDate1 = new Date(2024, 11, 11, 10, 0, 0);
        let endingDate = new Date(2025, 9, 11, 10, 0, 0);
        let endingDate1 = new Date(2025, 11, 11, 10, 0, 0);
        const semesterRepository = await MockRepositoriesForUnitTest.mockRepositories();
        semesterRepository.findAll = jest.fn()
            .mockImplementationOnce(() =>{
                return [
                    {id: '1234', actual: false, beginningDate, endingDate},
                    {id: '4321', actual: true, beginningDate1, endingDate1}
                ]
            })
        const service = new FindAllAcademicSemesterService(semesterRepository);
        let results = await service.execute();
        expect(results.all.length).toBe(2);
        expect(results.all[0].id).toBe('1234');
        expect(results.all[1].id).toBe('4321');
        expect(semesterRepository.findAll).toHaveBeenCalledTimes(1)
    })
})