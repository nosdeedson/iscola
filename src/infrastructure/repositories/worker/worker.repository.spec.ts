import { DataSource } from "typeorm";
import { PersonEntity } from "../../entities/@shared/person.entity";
import { AcademicSemesterEntity } from "../../entities/academic-semester/academic.semester.entity";
import { ClassEntity } from "../../entities/class/class.entity";
import { CommentEntity } from "../../entities/comment/comment.entity";
import { ParentEntity } from "../../entities/parent/parent.entity";
import { RatingEntity } from "../../entities/rating/rating.entity";
import { StudentEntity } from "../../entities/student/student.entity";
import { UserEntity } from "../../entities/user/user.entity";
import { WorkerEntity } from "../../entities/worker/worker.entity";
import { WorkerRepository } from "./worker.repository";
import { DomainMocks } from '../../__mocks__/mocks'
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";


const MILISECONDS = 1000;

describe("WorkerRepository unit tets", () =>{

    let AppDataSource;
    let workerModel;
    let repository;
    beforeEach(async () => {

        AppDataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234@Mudar",
            database: "iscola",
            entities: [
                WorkerEntity, 
                PersonEntity, 
                StudentEntity, 
                ParentEntity, 
                ClassEntity,
                AcademicSemesterEntity,
                CommentEntity,
                RatingEntity,
                UserEntity
            ],
            synchronize: true,
            logging: false,
            // driver: 'pg'
        })

        // to initialize the initial connection with the database, register all entities
        // and "synchronize" database schema, call "initialize()" method of a newly created database
        // once in your application bootstrap
        await AppDataSource.initialize()
            .then(() => {
                // here you can start to work with your database
            })
            .catch((error) => console.log(error));
        workerModel = AppDataSource.getRepository(WorkerEntity);
        repository = new WorkerRepository(workerModel, AppDataSource);
    })
        
    afterEach(async () => {
        const entities = AppDataSource.entityMetadatas;
        await workerModel.query(
            // `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
             `delete from person cascade`
         );
      
        AppDataSource.destroy();
    });

    it('should instantiate a workerRepository', () =>{
        workerModel = AppDataSource.getRepository(WorkerEntity);
        let repository = new WorkerRepository(workerModel, AppDataSource);
        expect(repository).toBeDefined();
    })

    it('should delete a worker entity in the database', async () =>{
        const expectedId = '27543f8f-11bd-464c-96af-c7cb09adeccf';
        const admin = new Worker(new Date(), 'jose', RoleEnum.ADMINISTRATOR, expectedId);
        let model = WorkerEntity.toWorkerEntity(admin);
        await repository.create(model);
        expect(await repository.delete(expectedId)).toBe(void 0);
    },(MILISECONDS * 5))

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
    },(MILISECONDS * 5));

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
    },(MILISECONDS * 5));


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
    },(MILISECONDS * 5));

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
    },(MILISECONDS * 5));

})