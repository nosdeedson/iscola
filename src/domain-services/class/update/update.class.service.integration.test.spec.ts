import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { ClassRepository } from '../../../infrastructure/repositories/class/class.repository'; 
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks'; 
import { UpdateClassDto } from './udpate.class.dto'
import { UpdateClassService } from './update.class.service';
import { DataSource } from "typeorm";
import { Repository } from "typeorm";


describe('update class integration test', () =>{

    let appDataSource: DataSource;
    let classRepository: ClassRepository;
    let classEntity: Repository<ClassEntity>;

    beforeEach( async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
                .catch(error => console.log(error));
        classEntity = appDataSource.getRepository(ClassEntity);
        classRepository = new ClassRepository(classEntity, appDataSource);
    })

    afterEach( async () =>{
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.destroy();
        jest.clearAllMocks();
    });

    it('entity and repository must be instantiated', async () =>{
        expect(classEntity).toBeDefined();
        expect(classRepository).toBeDefined();
    })

    it('should throw an error while updating class if id does not exist', async () =>{
        let schoolgroup = DomainMocks.mockSchoolGroup();
        let entity = ClassEntity.toClassEntity(schoolgroup);
        expect(await classRepository.create(entity)).toBeInstanceOf(ClassEntity);
        
        let wantedId = 'ea224f51-5404-4228-8a77-2795b900702d';
        let wantedBookName = 'bookb1';
        let wantedClassName = 'b1';
        let input : UpdateClassDto = new UpdateClassDto(wantedId, wantedBookName, wantedClassName);
        const service = new UpdateClassService(classRepository);
        try {
            await service.execute(input)
        } catch (error) {
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{ "context": "class", "message": "class not found"}]);
        }
    });

    it('should update a class', async () =>{
        let schoolgroup = DomainMocks.mockSchoolGroup();
        let entity = ClassEntity.toClassEntity(schoolgroup);
        expect(await classRepository.create(entity)).toBeInstanceOf(ClassEntity);
        let wantedId = schoolgroup.getId();

        let result = await classRepository.find(wantedId);

        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);

        let wantedBookName = 'bookb1';
        let wantedClassName = 'b1';
        let input : UpdateClassDto = new UpdateClassDto(wantedId, wantedBookName, wantedClassName);
        
        const service = new UpdateClassService(classRepository);

        expect(await service.execute(input)).toBe(void 0);

        result = await classRepository.find(wantedId);

        expect(result).toBeDefined();
        expect(result.id).toBe(wantedId);
        expect(result.className).toBe(input.className);
        expect(result.bookName).toBe(input.bookName);
        expect(result.updatedAt.getTime()).toBeGreaterThan(schoolgroup.getUpdatedAt().getTime());
        
    });

});