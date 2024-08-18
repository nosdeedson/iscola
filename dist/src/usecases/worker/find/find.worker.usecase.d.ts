import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { InputFindWorkerDto, OutputFindWorkerDto } from "./find.worker.dto";
export declare class FindWorker {
    private workerRepository;
    constructor(workerRepository: WorkerRepositoryInterface);
    execute(dto: InputFindWorkerDto): Promise<OutputFindWorkerDto>;
}
