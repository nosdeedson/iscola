import { RoleEnum } from "../../../domain/worker/roleEnum";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { DeleteWorkerUsecase } from '../delete/delete.worker.usecase';


describe('Delete worker integration test', () => {

    let appDataSource;
    let workerModel;
    let workerRepository;

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch(error => console.log(error));
        workerModel = appDataSource.getRepository(WorkerEntity);
        workerRepository = new WorkerRepository(workerModel, appDataSource);
    });

    afterEach(async () => {
        // await workerModel.query('delete from person cascade');
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.destroy();
    });

    it('repository must be instantiated', async () =>{
        expect(workerRepository).toBeDefined();
    });

    it('should delete a worker', async () =>{

        let worker = DomainMocks.mockWorker(RoleEnum.TEACHER);
        let workerModel = WorkerEntity.toWorkerEntity(worker);

        let wantedId = worker.getId();

        expect(await workerRepository.create(workerModel)).toBe(void 0);

        let results = await workerRepository.findAll();
        expect(results.length).toBe(1);
        let useCase =  new DeleteWorkerUsecase(workerRepository);

        await useCase.execute(wantedId);
        results = await workerRepository.findAll();
        expect(results.length).toBe(1);
        expect(results[0].deletedAt).toBeDefined();
    })

    it('should no anything if worker does not exist', async () =>{

        let worker = DomainMocks.mockWorker(RoleEnum.TEACHER);
        let workerModel = WorkerEntity.toWorkerEntity(worker);

        let wantedId = '00ac5b00-1326-40ce-8db9-bafaaa95f762';

        expect(await workerRepository.create(workerModel)).toBe(void 0);

        let result = await workerRepository.find(worker.getId());
        expect(result).toBeDefined();
        let useCase =  new DeleteWorkerUsecase(workerRepository);

        await useCase.execute(wantedId);
        result = await workerRepository.find(worker.getId());
        expect(result.deletedAt).toBeNull();
    })

})