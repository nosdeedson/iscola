import { AcademicSemester } from "../../../domain/academc-semester/academic.semester";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from "../../__mocks__/mocks";
import { AcademicSemesterEntity } from "../../entities/academic-semester/academic.semester.entity";
import { AcademicSemesterRepository } from './academic-semester.repository';

describe('AcademicSemesterRepository unit tests', () =>{

    let appDataSource;
    let academicSemesterModel;
    let repository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .then(() => {
                //console.log('connected')
            })
            .catch((error) => console.log(error));
        academicSemesterModel = appDataSource.getRepository(AcademicSemesterEntity);
        repository = new AcademicSemesterRepository(academicSemesterModel, appDataSource);
    });

    afterEach(async () =>{
        await academicSemesterModel.query('delete from academic_semester cascade');
        await appDataSource.destroy();
    });

    it('acacemicSemester should be instantiated', () => {
        expect(repository).toBeDefined();
    })

    it('should save an acacemicSemester on BD', async () => {
        let acacemicSemester = DomainMocks.mockAcademicSemester();
        let model = AcademicSemesterEntity.toAcademicSemester(acacemicSemester);
        let wantedId = acacemicSemester.getId();
        await repository.create(model);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined()
        expect(result.id).toEqual(wantedId);
        expect(result.actual).toBeTruthy()
    });

    it('should delete an academicSemester', async () => {
        let acacemicSemester = new AcademicSemester(true, new Date(), new Date(), 'acd72d81-1703-4313-b3f4-f4c6f8233433');
        let model = AcademicSemesterEntity.toAcademicSemester(acacemicSemester);
        let wantedId = acacemicSemester.getId();
        await repository.create(model);
        expect(await repository.delete(wantedId)).toBe(void 0);
    })

    it('should not throw an error if passed an id inesi', async () => {
        let acacemicSemester = new AcademicSemester(true, new Date(), new Date(), 'acd72d81-1703-4313-b3f4-f4c6f8233433');
        let model = AcademicSemesterEntity.toAcademicSemester(acacemicSemester);
        let wantedId = '85e71875-289c-48b1-82b1-8c4f9ae16104'
        await repository.create(model);
        expect(await repository.delete(wantedId)).toBe(void 0);
    })

    it('should find an academicSemester on BD', async () => {
        let acacemicSemester = new AcademicSemester(true, new Date(), new Date(), 'acd72d81-1703-4313-b3f4-f4c6f8233433');
        let model = AcademicSemesterEntity.toAcademicSemester(acacemicSemester);
        let wantedId = acacemicSemester.getId();
        await repository.create(model);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        expect(result.actual).toBeTruthy();
    })

    it('should find all academicSemester on BD', async () => {
        let acacemicSemester = new AcademicSemester(true, new Date(), new Date(), 'acd72d81-1703-4313-b3f4-f4c6f8233433');
        let model = AcademicSemesterEntity.toAcademicSemester(acacemicSemester);
        await repository.create(model);
        let acacemicSemester2 = new AcademicSemester(true, new Date(), new Date(), '85e71875-289c-48b1-82b1-8c4f9ae16104');
        let model2 = AcademicSemesterEntity.toAcademicSemester(acacemicSemester2);
        await repository.create(model2);
        let results = await repository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
        expect(results[0].actual).toBeTruthy();
        expect(results[0].createdAt.getTime()).toEqual(acacemicSemester.getCreatedAt().getTime());
        expect(results[1].createdAt.getTime()).toEqual(acacemicSemester2.getCreatedAt().getTime());
        expect(results[1].actual).toBeTruthy();
    });

    it('should update actual in academicSemester to false', async () => {
        let acacemicSemester = new AcademicSemester(true, new Date(), new Date(), 'acd72d81-1703-4313-b3f4-f4c6f8233433');
        let model = AcademicSemesterEntity.toAcademicSemester(acacemicSemester);
        let wantedId = acacemicSemester.getId();
        await repository.create(model); 
        
        let wantedActual = false;
        model.actual = wantedActual;
        await repository.update(model, wantedId);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.actual).toBeFalsy();
        expect(result.updatedAt.getTime()).toBeGreaterThan(acacemicSemester.getCreatedAt().getTime());
    })

})