import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { InputUpdateWorkerDto } from "./update.worker.dto";
export declare class UpdateUseCaseWorker {
    private workerRepository;
    constructor(workerRepository: WorkerRepositoryInterface);
    execute(dto: InputUpdateWorkerDto): Promise<void>;
    private update;
}
