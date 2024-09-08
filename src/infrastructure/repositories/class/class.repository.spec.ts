import { DomainMocks } from '../../__mocks__/mocks';
import { AppDataSourceMock } from '../../__mocks__/appDataSourceMock';
import { ClassRepository} from '../class/class.repository';
import { ClassEntity } from '../../entities/class/class.entity';


describe('ClassRepository unit test', () => {

    let appDataSource;
    let classrModel;
    let repository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
        
        classrModel = appDataSource.getRepository(ClassEntity);
        repository = new ClassRepository(classrModel, appDataSource)
        
    });

    afterEach(async () => {
        await classrModel.query('delete from class cascade');
        appDataSource.destroy();
    })

    it('repository must be instantiate', async () => {
        expect(repository).toBeDefined()
    })

    it('shoule save a class on BD', async () =>{
        let schoolGroup = DomainMocks.mockSchoolGroup();
        let classModel = ClassEntity.toClassEntity(schoolGroup);
        let wantedId = schoolGroup.getId();
        await repository.create(classModel);
        let result = await repository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(wantedId);
        
    })

})
