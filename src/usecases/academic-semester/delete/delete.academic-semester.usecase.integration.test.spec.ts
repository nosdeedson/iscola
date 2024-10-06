import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from '../../../infrastructure/repositories/academic-semester/academic-semester.repository';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { DeleteAcademicSemesterUseCase } from '../delete/delete.academic-semester.usecase';

describe('academic semester integration test', () =>{

    let appDataSource;
    let semesterModel;
    let semesterRepository;

    let semester;

    beforeEach(async () =>{
        semester = DomainMocks.mockAcademicSemester();
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        semesterModel = appDataSource.getRepository(AcademicSemesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterModel, appDataSource);
    });

    afterEach(async () => {
        await semesterModel.query('delete from academic_semester cascade');
        await appDataSource.destroy();
    })

    it('semester repository must be instantiated', async () =>{
        expect(semesterRepository).toBeDefined();
        expect(semesterModel).toBeDefined();
    });

    it('should delete an academic semester from BD', async () =>{
        let model = AcademicSemesterEntity.toAcademicSemester(semester);
        let wantedId = semester.getId();
        expect(await semesterRepository.create(model)).toBe(void 0);
        let result = await semesterRepository.find(wantedId);
        expect(result.id).toBeDefined();
        const usecase = new DeleteAcademicSemesterUseCase(semesterRepository);
        expect(await usecase.execute(wantedId)).toBe(void 0);
        result = await semesterRepository.find(wantedId);
        expect(result).toBeNull();
    })


})