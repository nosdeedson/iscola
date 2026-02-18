import { RoleEnum } from "../../../../domain/worker/roleEnum";
import { AppDataSource } from "../../../../infrastructure/repositories/config-test/appDataSource";
import { PersonEntity } from "../../../../infrastructure/entities/@shared/person.entity";
import { ClassEntity } from "../../../../infrastructure/entities/class/class.entity";
import { WorkerEntity } from "../../../../infrastructure/entities/worker/worker.entity";
import { ClassRepository } from "../../../../infrastructure/repositories/class/class.repository";
import { WorkerRepository } from "../../../../infrastructure/repositories/worker/worker.repository";
import { CreateWorkerDto } from "./create.worker.dto";
import { CreateWorkerService } from "./create.worker.service";
import { DomainMocks } from "../../../../infrastructure/__mocks__/mocks";
import { DataSource } from "typeorm";
import { WorkerRepositoryInterface } from "../../../../domain/worker/worker.repository.interface";
import { ClassRepositoryInterface } from "../../../../domain/class/class.repository.interface";

describe("CreateWorkerService integration test", () =>{
    let appDataSource: DataSource;
    let workerModel;
    let workerRepository: WorkerRepositoryInterface;
    let schoolGroupModel;
    let schoolGroupRepository: ClassRepository | ClassRepositoryInterface; 

    beforeEach(async () => {
        appDataSource = AppDataSource.getAppDataSource();
        await appDataSource.initialize()
            .catch((error) => console.log(error));
        workerModel = appDataSource.getRepository(WorkerEntity)
        workerRepository = new WorkerRepository(workerModel, appDataSource);
        schoolGroupModel = appDataSource.getRepository(ClassEntity);
        schoolGroupRepository = new ClassRepository(schoolGroupModel, appDataSource);
    })
        
    afterEach(async () => {
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
        expect(await schoolGroupRepository.create(schoolGroupEntity)).toBeInstanceOf(ClassEntity);
        workerModel = appDataSource.getRepository(WorkerEntity);
        let service = new CreateWorkerService(workerRepository, schoolGroupRepository);
        let worker =  {
            name: 'edson',
            birthday: new Date(),
            role: RoleEnum.TEACHER,
            classCode: schoolGroup.getClassCode()
        } as CreateWorkerDto;
        expect(await service.execute(worker)).toBeInstanceOf(WorkerEntity)
    });
})