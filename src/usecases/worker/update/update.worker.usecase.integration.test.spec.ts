import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { UpdateUseCaseWorker } from '../../../usecases/worker/update/udpate.worker.usecase';

describe('Update worker integration test', () => {

    let appDataSource;
    let workerModel;
    let workerRepository;

    beforeEach(async () =>{
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
        .catch(error => console.log(error))

        workerModel = appDataSource.getRepository(WorkerEntity);
        workerRepository = new WorkerRepository(workerModel, appDataSource);
    });

    afterEach( async () =>{
        // await workerModel.query('delete from person cascade');
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.destroy();
    });

    it('repository must be instatiated', async () =>{
        expect(workerRepository).toBeDefined();
    })

    it('should update a worker', async () => {
        let worker = new Worker(new Date(), 'jose', RoleEnum.TEACHER);
        let model = WorkerEntity.toWorkerEntity(worker);
        await workerRepository.create(model);

        let wantedId = worker.getId();
        let input = {
            id: wantedId,
            name: 'edson',
            role: RoleEnum.ADMINISTRATOR
        };

        let useCase = new UpdateUseCaseWorker(workerRepository);
        expect(await useCase.execute(input)).toBe(void 0);

        let result = await workerRepository.find(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toEqual(input.id);
        expect(result.role).toEqual(input.role);
        expect(result.fullName).toEqual(input.name);
        expect(result.createdAt).toEqual(worker.getCreatedAt());
        expect(result.updatedAt.getTime()).toBeGreaterThan(worker.getUpdatedAt().getTime());
    } );

    it('given an invalid id should not update a worker', async () => {
        let worker = new Worker(new Date(), 'jose', RoleEnum.TEACHER);
        let model = WorkerEntity.toWorkerEntity(worker);
        await workerRepository.create(model);

        let nonExistentId = 'ef136581-e6f1-412a-bfe1-4db85cddcb50';
        let input = {
            id: nonExistentId,
            name: 'edson',
            role: RoleEnum.ADMINISTRATOR
        };

        let useCase = new UpdateUseCaseWorker(workerRepository);
        expect(await useCase.execute(input)).toBe(void 0);

        let result = await workerRepository.find(worker.getId());
        expect(result).toBeDefined();
        expect(result.id).toEqual(worker.getId());
        expect(result.role).toEqual(worker.getRole());
        expect(result.fullName).toEqual(worker.getName());
        expect(result.createdAt).toEqual(worker.getCreatedAt());
        expect(result.updatedAt.getTime()).toEqual(worker.getUpdatedAt().getTime());
    } );

})