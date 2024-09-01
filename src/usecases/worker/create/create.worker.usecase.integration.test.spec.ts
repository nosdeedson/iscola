import { DataSource } from "typeorm"
import { WorkerModel } from "../../../infrastructure/repository/worker/worker.model"
import { WorkerRepository } from "../../../infrastructure/repository/worker/worker.repository";
import CreateWorkerUseCase from "./create.worker.usecase";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { PersonModel } from "../../../infrastructure/repository/@shared/person.model";
import { StudentModel } from "../../../infrastructure/repository/student/student.model";
import { ParentModel } from "../../../infrastructure/repository/parent/parent.model";
import { ClassModel } from "../../../infrastructure/repository/class/class.model";
import { AcademicSemesterModel } from "../../../infrastructure/repository/academic-semester/academic.semester.model";
import { CommentModel } from "../../../infrastructure/repository/comment/comment.model";
import { RatingModel } from "../../../infrastructure/repository/rating/rating.model";
import { UserModel } from "../../../infrastructure/repository/user/user.model";


describe("Create worker integration test", () =>{
    let AppDataSource;
    let workerModel;
    beforeEach(async () => {

        AppDataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "iscola",
            entities: [
                WorkerModel, 
                PersonModel, 
                StudentModel, 
                ParentModel, 
                ClassModel,
                AcademicSemesterModel,
                CommentModel,
                RatingModel,
                UserModel
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
        workerModel = AppDataSource.getRepository(WorkerModel);
        let repository = new WorkerRepository(workerModel, AppDataSource);
        expect(repository).toBeDefined();
    })

    it('create a worker', async () =>{
        workerModel = AppDataSource.getRepository(WorkerModel);
        let repository = new WorkerRepository(workerModel, AppDataSource);
        let useCase = new CreateWorkerUseCase(repository);
        let worker = {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.ADMINISTRATOR
        }
        expect(await useCase.execute(worker)).toBe(void 0)
    })
})