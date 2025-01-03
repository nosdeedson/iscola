import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from '../../../infrastructure/repositories/academic-semester/academic-semester.repository';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { DeleteAcademicSemesterService } from './delete.academic-semester.service';

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
        // await semesterModel.query('delete from academic_semester cascade');
        await appDataSource.createQueryBuilder().delete().from(AcademicSemesterEntity).execute();
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
        const service = new DeleteAcademicSemesterService(semesterRepository);
        expect(await service.execute(wantedId)).toBe(void 0);
        result = await semesterRepository.find(wantedId);
        expect(result).toBeNull();
    })

    it('should not delete an academic semester from BD if id does not exist', async () =>{
        let model = AcademicSemesterEntity.toAcademicSemester(semester);
        let wantedId = '1a5ca91c-25c3-48aa-ad26-7b5c009e65dc';
        expect(await semesterRepository.create(model)).toBe(void 0);
        let results = await semesterRepository.findAll();
        expect(results.length).toBe(1);
        const service = new DeleteAcademicSemesterService(semesterRepository);
        expect(await service.execute(wantedId)).toBe(void 0);
        results = await semesterRepository.findAll();
        expect(results.length).toBe(1);

    })


})