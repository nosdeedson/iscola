import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from '../../../infrastructure/repositories/academic-semester/academic-semester.repository';
import { CreateAcademicSemesterUseCase } from '../../academic-semester/create/create.academic-semester.usecase';


describe('Academic semester integration test', () =>{

    let appDataSource;
    let semesterModel;
    let semesterRepository;
    let input;

    beforeEach( async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
        semesterModel = appDataSource.getRepository(AcademicSemesterEntity);
        semesterRepository = new AcademicSemesterRepository(semesterModel, appDataSource);
        input = {
            beginningDate: new Date(2024, 8, 30, 10, 59, 59),
            endingDate: new Date(2024, 10, 29, 10, 59, 59)
        };
    });

    afterEach( async () =>{
        // await semesterModel.query('delete from academic_semester cascade');
        await appDataSource.createQueryBuilder().delete().from(AcademicSemesterEntity).execute();
        await appDataSource.destroy();
    });

    it('repository must be instantiated', async () => {
        expect(semesterRepository).toBeDefined();
    })

    it('should save a academicSemester in BD', async () =>{
        let useCase = new CreateAcademicSemesterUseCase(semesterRepository);
        expect(await useCase.execute(input)).toBe(void 0);
        let results = await semesterRepository.findAll();
        expect(results).toBeDefined();
        expect(results[0].beginningDate).toEqual(input.beginningDate);
        expect(results[0].endingDate).toEqual(input.endingDate);
        expect(results[0].id).toBeDefined();
    });

});