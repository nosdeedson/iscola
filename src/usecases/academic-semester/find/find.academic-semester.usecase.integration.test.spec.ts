import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from "../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { FindAcademicSemesterUseCase } from "./find.academic-semester.usecase"

describe('Academic semester find integrations tests', () => {

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

    afterEach(async () =>{
        // await semesterModel.query('delete from academic_semester cascade');
        await appDataSource.createQueryBuilder().delete().from(AcademicSemesterEntity).execute();
        await appDataSource.destroy();
    })

    it('model and repository should be instantiated', async () =>{
        expect(semesterModel).toBeDefined();
        expect(semesterRepository).toBeDefined()
    })

    it('should find an academicSemester on BD', async () =>{
        let model = AcademicSemesterEntity.toAcademicSemester(semester);
        let wantedId = semester.getId();
        let result = await semesterRepository.find(wantedId);
        expect(result).toBeNull()
        expect(await semesterRepository.create(model)).toBe(void 0);
        const usecase = new FindAcademicSemesterUseCase(semesterRepository);
        result = await usecase.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
    })  

    it('should not find an academicSemester on BD', async () =>{
        let model = AcademicSemesterEntity.toAcademicSemester(semester);
        let wantedId = '7f572806-fcb5-48ac-921c-595f966b24da';
        let result = await semesterRepository.find(wantedId);
        expect(result).toBeNull()
        expect(await semesterRepository.create(model)).toBe(void 0);
        const usecase = new FindAcademicSemesterUseCase(semesterRepository);
        try {
            result = await usecase.execute(wantedId);
        } catch (error) {
            expect(error.errors[0].message).toBe('Academic Semester not found');
        }
    })  
})