import { RoleEnum } from "../../../domain/worker/roleEnum";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { ClassRepository } from '../../../infrastructure/repositories/class/class.repository';
import { WorkerRepository } from '../../../infrastructure/repositories/worker/worker.repository';
import { InputCreateWorkerDto } from "./create.worker.dto";
import CreateWorkerUseCase from "./create.worker.usecase";


const MILISECONDS = 1000;

describe("Create worker integration test", () =>{
    let appDataSource;
    let workerModel;
    let workerRepository;
    let schoolGroupModel;
    let schoolGroupRepository; 

    beforeEach(async () => {
        appDataSource = AppDataSourceMock.mockAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
        workerModel = appDataSource.getRepository(WorkerEntity)
        workerRepository = new WorkerRepository(workerModel, appDataSource);
        schoolGroupModel = appDataSource.getRepository(ClassEntity);
        schoolGroupRepository = new ClassRepository(schoolGroupModel, appDataSource);
    })
        
    afterEach(async () => {
        // await workerModel.query('delete from person cascase');
        // await schoolGroupModel.query('delete from class cascade');
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();

        await appDataSource.destroy();
    })
            
    it("repositories must be instantiated", async () =>{
        expect(workerRepository).toBeDefined();
        expect(schoolGroupRepository).toBeDefined();
    })

    it('create a worker', async () =>{
        workerModel = appDataSource.getRepository(WorkerEntity);
        let useCase = new CreateWorkerUseCase(workerRepository, schoolGroupRepository);
        let worker =  {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.TEACHER
        } as InputCreateWorkerDto;
        expect(await useCase.execute(worker)).toBe(void 0)
    }, (5 * MILISECONDS))
})