import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { FindAllWorker } from '../list/list.worker.usecase';



describe('list usecase integration tests', () => {

    let appDataSource;
    let workerModel;
    let workerRepository;

    beforeEach( async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        
        workerModel = appDataSource.getRepository(WorkerEntity);
        workerRepository = new WorkerRepository(workerModel, appDataSource);
    });

    afterEach(async () =>{
        // await workerModel.query('delete from person cascade');
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.destroy();
    });

    it('repository must be instantiated', async () =>{
        expect(workerRepository).toBeDefined();
    });

    it('if none worker exist should return empty', async () =>{
        let useCase = new FindAllWorker(workerRepository);
        let results = await useCase.execute();
        expect(results.all.length).toBe(0)
    })

    it('should find all worker', async () =>{
        let worker = new Worker(new Date(), 'one', RoleEnum.TEACHER, '1828c5d5-3947-4589-88c8-3575f6f51fcb');
        let model = WorkerEntity.toWorkerEntity(worker);
        await workerRepository.create(model);

        let worker1 = new Worker(new Date(), 'two', RoleEnum.ADMINISTRATOR, '7a856a80-ffa0-42ab-bd9d-f5fefb3407f7');
        let model1 = WorkerEntity.toWorkerEntity(worker1);
        await workerRepository.create(model1);

        let worker2 = new Worker(new Date(), 'two', RoleEnum.TEACHER, 'd5353d39-da88-46e4-ac1a-ff54dd841570');
        let model2 = WorkerEntity.toWorkerEntity(worker2);
        await workerRepository.create(model2);

        let useCase = new FindAllWorker(workerRepository);
        let results = await useCase.execute();
        expect(results.all.length).toBe(3);

    })

})