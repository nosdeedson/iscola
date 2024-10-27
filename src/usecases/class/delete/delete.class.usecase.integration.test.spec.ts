import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { ClassRepository } from "../../../infrastructure/repositories/class/class.repository";
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { DeleteClassUseCase } from './delete.class.usecase';


describe('delete class usecase integration test', () =>{

    let appDatasource;
    let classEntity;
    let classRepository;

    let entity;

    beforeEach(async () =>{
        appDatasource = AppDataSourceMock.mockAppDataSource();
        await appDatasource.initialize()
            .catch(error => console.log(error));
        classEntity = appDatasource.getRepository(ClassEntity);
        classRepository = new ClassRepository(classEntity, appDatasource);
    });

    afterEach(async () =>{
        await appDatasource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDatasource.destroy();
        jest.clearAllMocks();
    })

    it('repository and entity should be instantiated', async () =>{
        expect(classEntity).toBeDefined();
        expect(classRepository).toBeDefined();
    });

    it('should delete a class from the DB', async () =>{
        let schoolgroup = DomainMocks.mockSchoolGroup();
        let entity = ClassEntity.toClassEntity(schoolgroup);
        let wantedId = schoolgroup.getId();
        expect(await classRepository.create(entity)).toBe(void 0);

        let result = await classRepository.find(wantedId);
        expect(result).toBeDefined();

        const usecase = new DeleteClassUseCase(classRepository);
        expect(await usecase.execute(wantedId)).toBe(void 0);
        
        let results = await classRepository.findAll();
        expect(results.length).toBe(0);
    });

    it('should not thorw an error while deleting class with invalid id', async () =>{
        let schoolgroup = DomainMocks.mockSchoolGroup();
        let entity = ClassEntity.toClassEntity(schoolgroup);
        let wantedId = 'a58827ba-0560-4cab-b283-19d1435fbdd2';
        
        expect(await classRepository.create(entity)).toBe(void 0);

        let results = await classRepository.findAll();
        expect(results.length).toBe(1);

        const usecase = new DeleteClassUseCase(classRepository);
        expect(await usecase.execute(wantedId)).toBe(void 0);
        
        results = await classRepository.findAll();
        expect(results.length).toBe(1);
    });

})