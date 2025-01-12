import { CreateWorkerService } from "src/domain-services/worker/create/create.worker.service";
import { CreateUsersService } from "../create-users.service";
import { WorkerRepositoryInterface } from "src/domain/worker/worker.repository.interface";
import { WorkerRepository } from "src/infrastructure/repositories/worker/worker.repository";
import { DataSource } from "typeorm";
import { ClassRepositoryInterface } from "src/domain/class/class.repository.interface";
import { ClassRepository } from "src/infrastructure/repositories/class/class.repository";
import { InputCreateWorkerDto } from "src/domain-services/worker/create/create.worker.dto";
import { RoleEnum } from "src/domain/worker/roleEnum";

export class CreateUserTeacher extends CreateUsersService {

    private workerRepository: WorkerRepositoryInterface;
    private schoolgroupRepository: ClassRepositoryInterface;

    constructor(
        workerRepository: WorkerRepository, 
        schoolgroupRepository: ClassRepository
    ){
        super();
        this.workerRepository = workerRepository;
        this.schoolgroupRepository = schoolgroupRepository;
    }

    async createActor(dto: any): Promise<void> {
        // TODO 
        console.log('creating a teacher')
        let input : InputCreateWorkerDto = {
            accesstype : dto.access,
            birthday : dto.birthday,
            classCode : dto.classCode,
            email : dto.email,
            name : dto.name,
            nickname: dto.nickname,
            password: dto.password,
            role: RoleEnum.TEACHER
        }
        let service = new CreateWorkerService(this.workerRepository, this.schoolgroupRepository)
    }
}
