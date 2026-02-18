import { DataSource } from "typeorm";
import { Repository } from "typeorm";
import { AcademicSemester } from "../../../../domain/academc-semester/academic.semester";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { AcademicSemesterEntity } from "../../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from "../../../../infrastructure/repositories/academic-semester/academic-semester.repository";
import { FindAllAcademicSemesterService } from "./findAll.academic-semester.service";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";

describe('AcademicSemester integration tests', () =>{

    let appDataSource: DataSource;
    let semesterModel: Repository<AcademicSemesterEntity>;
    let semesterRepository: AcademicSemesterRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSource.getAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error))
        
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
        expect(semesterRepository).toBeDefined();
    })

    it('should receive an empty array', async () =>{
        const service = new FindAllAcademicSemesterService(semesterRepository);
        let results = await service.execute();
        expect(results.all.length).toBe(0);
    });

    it('should receive two semester', async () =>{
        let semester = DomainMocks.mockAcademicSemester();
        let entity = AcademicSemesterEntity.toAcademicSemester(semester);
        expect(await semesterRepository.create(entity)).toBeInstanceOf(AcademicSemesterEntity);

        let aValidBeginnig = new Date(2025 , 1, 5, 10, 0,0,0);
        let aValidEnding = new Date(2025, 6, 1, 1, 0, 0);
        const academicSemester = new AcademicSemester(true, aValidBeginnig, aValidEnding);
        let entity1 = AcademicSemesterEntity.toAcademicSemester(academicSemester);
        expect(await semesterRepository.create(entity1)).toBeInstanceOf(AcademicSemesterEntity);
        
        const service = new FindAllAcademicSemesterService(semesterRepository);
        const results = await service.execute();

        expect(results.all.length).toBe(2);
        expect(results.all[0].id).toEqual(semester.getId());
        expect(results.all[1].id).toEqual(academicSemester.getId());
    })

})