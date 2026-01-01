import { DataSource } from "typeorm";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { WorkerRepository } from "../../../infrastructure/repositories/worker/worker.repository";
import { FindWorkerService } from './find.worker.service'


describe('FindWorkerService integration test', () =>{

    let appDataSource: DataSource;
    let workerModel;
    let workerRepository: WorkerRepositoryInterface;

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
    })

    it('should find a worker from BD', async () =>{
        let worker = DomainMocks.mockWorker(RoleEnum.TEACHER);
        let model = WorkerEntity.toWorkerEntity(worker);
        await workerRepository.create(model);

        let service = new FindWorkerService(workerRepository);
        let input = { id : worker.getId()};
        let output = await service.execute(input);
        expect(output).toBeDefined();
        expect( output.id).toEqual(worker.getId());
        expect(output.birthday).toEqual(worker.getBirthday());
        expect(output.name).toEqual(worker.getName());
        expect(output.role).toEqual(worker.getRole());
        expect(output.createdAt).toEqual(worker.getCreatedAt());
    } )

    it('should not find a worker if id invalid', async () =>{
        let worker = DomainMocks.mockWorker(RoleEnum.TEACHER);
        let model = WorkerEntity.toWorkerEntity(worker);
        await workerRepository.create(model);

        let nonExistentId = '31420be1-0ca7-4619-83e9-50101d9ace72'
        let input = { id : nonExistentId};

        let service = new FindWorkerService(workerRepository);
        let output = await service.execute(input);
        expect(output).toBeDefined();
        expect( output).toEqual({});
    } );

});