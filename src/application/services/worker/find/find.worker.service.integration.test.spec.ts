import { DataSource } from "typeorm";
import { RoleEnum } from "../../../../domain/worker/roleEnum";
import { WorkerRepositoryInterface } from "../../../../domain/worker/worker.repository.interface";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { PersonEntity } from "../../../../infrastructure/entities/@shared/person.entity";
import { WorkerEntity } from "../../../../infrastructure/entities/worker/worker.entity";
import { WorkerRepository } from "../../../../infrastructure/repositories/worker/worker.repository";
import { FindWorkerService } from './find.worker.service'
import { SystemError } from "../../@shared/system-error";


describe('FindWorkerService integration test', () =>{

    let appDataSource: DataSource;
    let workerModel;
    let workerRepository: WorkerRepositoryInterface;

    beforeEach( async () => {
        appDataSource = AppDataSource.getAppDataSource();
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
        let output = await service.execute(worker.getId());
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

        let service = new FindWorkerService(workerRepository);
        try {  
            let output = await service.execute(nonExistentId);
        } catch (error) {
            expect(error).toBeInstanceOf(SystemError);
            //@ts-ignore
            expect(error.errors).toStrictEqual([{context: "find user", message: "Failed to find the user"}]);
        }
    } );

});