import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { AppDataSourceMock } from "../../__mocks__/appDataSourceMock";
import { DomainMocks } from '../../__mocks__/mocks';
import { PersonEntity } from "../../entities/@shared/person.entity";
import { WorkerEntity } from "../../entities/worker/worker.entity";
import { WorkerRepository } from "./worker.repository";


const MILISECONDS = 1000;

describe("WorkerRepository unit tets", () =>{

    let appDataSource;
    let workerModel;
    let repository;
    beforeEach(async () => {

        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
            
        workerModel = appDataSource.getRepository(WorkerEntity);
        repository = new WorkerRepository(workerModel, appDataSource);
    })
        
    afterEach(async () => {
        // const entities = appDataSource.entityMetadatas;
        // await workerModel.query(
        //     // `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
        //      `delete from person cascade`
        //  );
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.destroy();
    });

    it('should instantiate a workerRepository', () =>{
        expect(repository).toBeDefined();
    })

    it('should delete a worker entity in the database', async () =>{
        const expectedId = '27543f8f-11bd-464c-96af-c7cb09adeccf';
        const admin = new Worker(new Date(), 'jose', RoleEnum.ADMINISTRATOR, expectedId);
        let model = WorkerEntity.toWorkerEntity(admin);
        await repository.create(model);
        expect(await repository.delete(expectedId)).toBe(void 0);
    })

    it('should create a worker entity in the database', async () =>{
        let worker = DomainMocks.mockWorker(RoleEnum.ADMINISTRATOR);
        let model = WorkerEntity.toWorkerEntity(worker);
        let id = worker.getId();
        await repository.create(model);
        let result = await repository.find(id);
        expect(result).toBeDefined();
        expect(result.birthday).toEqual(model.birthday);
        expect(result.role).toEqual(model.role)
        expect(result.id).toEqual(model.id)
    });

    it('should find a worker entity in the database', async () =>{
        const expectedId = '27543f8f-11bd-464c-96af-c7cb09adeccf';
        const admin = new Worker(new Date(), 'jose', RoleEnum.ADMINISTRATOR, expectedId);
        let model = WorkerEntity.toWorkerEntity(admin);
        await repository.create(model);
        let result = await repository.find(expectedId);
        expect(result).toBeDefined();
        expect(result.birthday).toEqual(model.birthday);
        expect(result.role).toEqual(model.role)
        expect(result.id).toEqual(model.id)
    });


    it('should find all workers entity in the database', async () =>{
        let worker1 = DomainMocks.mockWorker(RoleEnum.ADMINISTRATOR);
        let model = WorkerEntity.toWorkerEntity(worker1);
        let worker2 = DomainMocks.mockWorker(RoleEnum.TEACHER);
        let model2 = WorkerEntity.toWorkerEntity(worker2);
        await repository.create(model);
        await repository.create(model2);
        let results = await repository.findAll();
        expect(results.length).toBe(2);
        expect(results[0]).toStrictEqual(model)
        expect(results[1]).toStrictEqual(model2)
    });

    it('should udpate a workers entity in the database', async () =>{
        const expectedId = '27543f8f-11bd-464c-96af-c7cb09adeccf';
        const admin = new Worker(new Date(), 'jose', RoleEnum.ADMINISTRATOR, expectedId);
        let model = WorkerEntity.toWorkerEntity(admin);
        let worker2 = DomainMocks.mockWorker(RoleEnum.TEACHER);
        let model2 = WorkerEntity.toWorkerEntity(worker2);
        await repository.create(model);
        expect(await repository.update(model2, expectedId)).toBe(void 0);
        let result = await repository.find(expectedId);
        expect(result).toBeDefined()
        //expect(result).toStrictEqual(model2)
    });

})