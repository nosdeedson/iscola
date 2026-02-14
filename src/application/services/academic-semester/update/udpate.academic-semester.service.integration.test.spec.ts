import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { AppDataSourceMock } from "../../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from '../../../../infrastructure/repositories/academic-semester/academic-semester.repository';
import { UpdateAcademicSemesterDto } from "./udpate.academic-semester.dto";
import { UpdateAcademicSemesterService } from "./update.academic-semester.service";


describe('Update AcademicSemester integration tests', () =>{

    let appDataSource: DataSource;
    let semesterModel: Repository<AcademicSemesterEntity>;
    let semesterRepository: AcademicSemesterRepository;

    beforeEach(async () =>{
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
    });

    it('repository and model should be instantiated', async () =>{
        expect(semesterModel).toBeDefined();
        expect(semesterRepository).toBeDefined();
    })

    it('should update an academicSemester', async () => {
        let semester = DomainMocks.mockAcademicSemester();
        let wantedId = semester.getId();
        let entity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(entity)).toBeInstanceOf(AcademicSemesterEntity);

        const service = new UpdateAcademicSemesterService(semesterRepository);
        let dto = new UpdateAcademicSemesterDto(wantedId, false);
        expect(await service.execute(dto)).toBe(void 0);
        let result = await semesterRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.actual).toBeFalsy();
    })
})