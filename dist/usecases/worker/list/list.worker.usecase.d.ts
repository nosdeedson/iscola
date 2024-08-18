import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { OutputFindAllWorkerDto } from "./list.worker.dto";
export declare class FindAllWorker {
    private workerRepository;
    constructor(workerRepository: WorkerRepositoryInterface);
    execute(): Promise<OutputFindAllWorkerDto>;
}
