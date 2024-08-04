import { Worker } from "../../../domain/worker/worker";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { InputUpdateWorkerDto } from "./update.worker.dto";

export class UpdateWorker {
    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface){
        this.workerRepository = workerRepository;
    }

    public async execute(dto: InputUpdateWorkerDto){
        let worker = await this.workerRepository.find(dto.id);
        worker = this.update(worker, dto);
        if(worker.notification?.hasError()){
            throw new Error(worker.notification.messages());
        }
        this.workerRepository.update(worker);
        
    }

    private update(worker: Worker, dto: InputUpdateWorkerDto): Worker{
        worker.name = dto.name;
        worker.role = dto.role;
        worker.validate();
        return worker;
    }
}