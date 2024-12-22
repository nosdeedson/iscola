import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { AppDataSourceMock } from '../../../infrastructure/__mocks__/appDataSourceMock';
import { ClassEntity } from 'src/infrastructure/entities/class/class.entity';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';
import { FindClassService } from './find.class.service';


describe('find class service integration test', () =>{

    let appDataSource;
    let classEntity;
    let classRepository;

    let schoolgroup;

    beforeEach( async () =>{
        schoolgroup = DomainMocks.mockSchoolGroup();
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error))
        classEntity = appDataSource.getRepository(ClassEntity);
        classRepository = new ClassRepository(classEntity, appDataSource);
    });

    afterEach( async () =>{
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('should not find a class on BD with wrong id', async () =>{
        schoolgroup = DomainMocks.mockSchoolGroup();
        let entity = ClassEntity.toClassEntity(schoolgroup);
        expect(await classRepository.create(entity)).toBe(void 0);
        const service = new FindClassService(classRepository);

        let wantedId = '95be3d59-a09c-4da5-9140-0c805c5a391d';
        try{
            let result = await service.execute(wantedId);
        } catch(error){
            expect(error.errors).toBeDefined();        
            expect(error.errors[0]).toStrictEqual({context: 'class', message: 'class not found'})
        }
    });

    it('repository and entity must be instantiated', async () =>{
        expect(classEntity).toBeDefined();
        expect(classRepository).toBeDefined();
    })

    it('should find a class on BD', async () =>{
        schoolgroup = DomainMocks.mockSchoolGroup();
        let entity = ClassEntity.toClassEntity(schoolgroup);
        expect(await classRepository.create(entity)).toBe(void 0);
        const service = new FindClassService(classRepository);

        let wantedId = schoolgroup.getId();
        let result = await service.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        
    });

})