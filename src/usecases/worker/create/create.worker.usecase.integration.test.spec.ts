import { DataSource } from "typeorm";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { AcademicSemesterEntity } from "../../../infrastructure/entities/academic-semester/academic.semester.entity";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { CommentEntity } from "../../../infrastructure/entities/comment/comment.entity";
import { ParentEntity } from "../../../infrastructure/entities/parent/parent.entity";
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { StudentEntity } from "../../../infrastructure/entities/student/student.entity";
import { UserEntity } from "../../../infrastructure/entities/user/user.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { WorkerRepository } from "../../../infrastructure/repositories/worker.repository";
import CreateWorkerUseCase from "./create.worker.usecase";


const MILISECONDS = 1000;

describe("Create worker integration test", () =>{
    let AppDataSource;
    let workerModel;
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

    })
        
    afterEach( async () =>{
            AppDataSource.destroy();
        })
            
    it("Create a worker repository", async () =>{
        workerModel = AppDataSource.getRepository(WorkerEntity);
        let repository = new WorkerRepository(workerModel, AppDataSource);
        expect(repository).toBeDefined();
    })

    it('create a worker', async () =>{
        workerModel = AppDataSource.getRepository(WorkerEntity);
        let repository = new WorkerRepository(workerModel, AppDataSource);
        let useCase = new CreateWorkerUseCase(repository);
        let worker =  {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.TEACHER
        }
        expect(await useCase.execute(worker)).toBe(void 0)
    }, (5 * MILISECONDS))
})