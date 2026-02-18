import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../infrastructure/repositories/config-test/appDataSource';
import { DomainMocks } from '../../../../infrastructure/__mocks__/mocks';
import { ParentEntity } from '../../../../infrastructure/entities/parent/parent.entity';
import { StudentEntity } from '../../../../infrastructure/entities/student/student.entity';
import { ParentRepository } from '../../../../infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from '../../../../infrastructure/repositories/student/student.repository';
import { FindAllParentService } from './findAll.parent.service';


describe('FindAllParentService integration tests', () =>{

    let appDataSource: DataSource;
    let parentEntity: Repository<ParentEntity>;
    let parentRepository: ParentRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSource.getAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        parentEntity = appDataSource.getRepository(ParentEntity);
        parentRepository = new ParentRepository(parentEntity, appDataSource);
    });

    afterEach(async () =>{
        await appDataSource.createQueryBuilder().delete().from(ParentEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('entitites and repositories must be instantiated', async () =>{
        expect(parentEntity).toBeDefined();
        expect(parentRepository).toBeDefined();
    });

    it('should find an empty array', async () =>{
        const service = new FindAllParentService(parentRepository);
        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(0);
    });

    it('should find an array with one parent', async () =>{
        const parent = DomainMocks.mockParentWithoutStudent();
        const entity = ParentEntity.toParentEntity(parent);
        expect(await parentRepository.create(entity)).toBeInstanceOf(ParentEntity);
        const service = new FindAllParentService(parentRepository);
        const results = await service.execute();
        expect(results).toBeDefined();
        expect(results.all.length).toBe(1);
        expect(results.all[0].id).toBe(parent.getId());
    });
});