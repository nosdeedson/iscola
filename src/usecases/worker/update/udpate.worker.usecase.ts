import { WorkerEntity } from "src/infrastructure/entities/worker/worker.entity";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { InputUpdateWorkerDto } from "./update.worker.dto";

export class UpdateUseCaseWorker {

    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface){
        this.workerRepository = workerRepository;
    }

    public async execute(dto: InputUpdateWorkerDto){
        let worker = await this.workerRepository.find(dto.id)as WorkerEntity;
        if(worker){
            worker = this.update(worker, dto);
            this.workerRepository.update(worker, worker.id);
        }
    }

    private update(worker: WorkerEntity, dto: InputUpdateWorkerDto): WorkerEntity{
        worker.fullName = dto.name;
        worker.role = dto.role;
        return worker;
    }
}