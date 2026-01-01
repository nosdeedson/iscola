import { DomainMocks } from '../../__mocks__/mocks';
import { AppDataSourceMock } from '../../__mocks__/appDataSourceMock';
import { ClassRepository} from '../class/class.repository';
import { ClassEntity } from '../../entities/class/class.entity';
import { Class } from '../../../domain/class/class';
import { DataSource } from 'typeorm';


describe('ClassRepository unit test', () => {

    let appDataSource: DataSource;
    let classModel;
    let repository: ClassRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
        
        classModel = appDataSource.getRepository(ClassEntity);
        repository = new ClassRepository(classModel, appDataSource)
        
    });

    afterEach(async () => {
        // await classModel.query('delete from class cascade');
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.destroy();
    })

    it('repository must be instantiate', async () => {
        expect(repository).toBeDefined()
    })

    it('should save a class on BD', async () =>{
        let schoolGroup = DomainMocks.mockSchoolGroup();
        let classModel = ClassEntity.toClassEntity(schoolGroup);
        let wantedId = schoolGroup.getId();
        expect(await repository.create(classModel)).toBeInstanceOf(ClassEntity);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        
    })

    it('should delete a class on BD', async () =>{
        let schedule = DomainMocks.mockSchedule();
        let wantedId = '2ac4ba35-a052-439f-91dc-1a85c655a339';
        let schoolGroup = new Class('1234', 'nameBook', 'a1', schedule, wantedId);
        let classModel = ClassEntity.toClassEntity(schoolGroup);
        expect(await repository.create(classModel)).toBeInstanceOf(ClassEntity);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(await repository.delete(wantedId)).toBe(void 0);
    })

    it('should find a class on BD', async () =>{
        let schedule = DomainMocks.mockSchedule();
        let wantedId = '2ac4ba35-a052-439f-91dc-1a85c655a339';
        let schoolGroup = new Class('1234', 'nameBook', 'a1', schedule, wantedId);
        let classModel = ClassEntity.toClassEntity(schoolGroup);
        expect(await repository.create(classModel)).toBeInstanceOf(ClassEntity);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        expect(result.firstDayOfClassInWeek).toEqual(schoolGroup.getSchecule().getDayOfWeek()[0]);
        expect(result.secondDayOfClassInWeek).toEqual(schoolGroup.getSchecule().getDayOfWeek()[1]);
    })

    it('should find all class on BD', async () =>{
        let schedule = DomainMocks.mockSchedule();
        let schoolGroup = new Class('1234', 'nameBook', 'a1', schedule, '2ac4ba35-a052-439f-91dc-1a85c655a339');
        let classModel = ClassEntity.toClassEntity(schoolGroup);
        expect(await repository.create(classModel)).toBeInstanceOf(ClassEntity);
        let schoolGroup2 = new Class('1234', 'nameBook', 'a1', schedule, '2ac4ba35-a052-439f-91dc-1a85c655a340');
        let classModel2 = ClassEntity.toClassEntity(schoolGroup2);
        expect(await repository.create(classModel2)).toBeInstanceOf(ClassEntity);

        let results = await repository.findAll();
        expect(results).toBeDefined();
        expect(results.length).toBe(2);
        expect(results[0].firstDayOfClassInWeek).toEqual(schoolGroup.getSchecule().getDayOfWeek()[0]);
        expect(results[0].secondDayOfClassInWeek).toEqual(schoolGroup.getSchecule().getDayOfWeek()[1]);
    })

    it('should update a class on BD', async () =>{
        let schedule = DomainMocks.mockSchedule();
        let wantedId = '2ac4ba35-a052-439f-91dc-1a85c655a339';
        
        let schoolGroup = new Class('1234', 'nameBook', 'a1', schedule, wantedId);
        let classModel = ClassEntity.toClassEntity(schoolGroup);
        expect(await repository.create(classModel)).toBeInstanceOf(ClassEntity);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        let wantedBookName = 'another book';
        let wantedClassName = 'b1';
        classModel.bookName = wantedBookName;
        classModel.className = wantedClassName;
        await repository.update(classModel);

        result = await repository.find(wantedId);

        expect(result.id).toEqual(wantedId);
        expect(result.bookName).toEqual(wantedBookName);
        expect(result.className).toEqual(wantedClassName);
    });
});
