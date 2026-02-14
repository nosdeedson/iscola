import { DataSource } from "typeorm";
import { AcademicSemesterInterface } from "../../../../domain/academc-semester/academic.semester.repository.interface";
import { AppDataSourceMock } from "../../../../infrastructure/__mocks__/appDataSourceMock";
import { AcademicSemesterEntity } from "../../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from '../../../../infrastructure/repositories/academic-semester/academic-semester.repository';
import { InputCreateAcademicSemesterDto } from "./academic-semester.dto";
import { CreateAcademicSemesterService } from './create.academic-semester.service';


describe('Academic semester integration test', () =>{

    let appDataSource: DataSource;
    let semesterModel;
    let semesterRepository: AcademicSemesterInterface;
    let input: InputCreateAcademicSemesterDto;

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
        let service = new CreateAcademicSemesterService(semesterRepository);
        expect(await service.execute(input)).toBe(void 0);
        let results = await semesterRepository.findAll();
        expect(results).toBeDefined();
        expect(results[0].beginningDate).toEqual(input.beginningDate);
        expect(results[0].endingDate).toEqual(input.endingDate);
        expect(results[0].id).toBeDefined();
    });

});