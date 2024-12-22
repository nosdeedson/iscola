import { RoleEnum } from "../../../domain/worker/roleEnum";
import { AppDataSourceMock } from "../../../infrastructure/__mocks__/appDataSourceMock";
import { PersonEntity } from "../../../infrastructure/entities/@shared/person.entity";
import { ClassEntity } from "../../../infrastructure/entities/class/class.entity";
import { WorkerEntity } from "../../../infrastructure/entities/worker/worker.entity";
import { ClassRepository } from '../../../infrastructure/repositories/class/class.repository';
import { WorkerRepository } from '../../../infrastructure/repositories/worker/worker.repository';
import { InputCreateWorkerDto } from "./create.worker.dto";
import { CreateWorkerService } from "./create.worker.service";
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';

describe("CreateWorkerService integration test", () =>{
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
        await appDataSource.createQueryBuilder().delete().from(ClassEntity).execute();
        await appDataSource.createQueryBuilder().delete().from(PersonEntity).execute();

        await appDataSource.destroy();
    })
            
    it("repositories must be instantiated", async () =>{
        expect(workerRepository).toBeDefined();
        expect(schoolGroupRepository).toBeDefined();
    })

    it('create a worker', async () =>{
        const schoolGroup = DomainMocks.mockSchoolGroup();
        const schoolGroupEntity = ClassEntity.toClassEntity(schoolGroup);
        expect(await schoolGroupRepository.create(schoolGroupEntity)).toBe(void 0);
        workerModel = appDataSource.getRepository(WorkerEntity);
        let useCase = new CreateWorkerService(workerRepository, schoolGroupRepository);
        let worker =  {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.TEACHER,
            classCode: schoolGroup.getClassCode()
        } as InputCreateWorkerDto;
        expect(await useCase.execute(worker)).toBe(void 0)
    })
})