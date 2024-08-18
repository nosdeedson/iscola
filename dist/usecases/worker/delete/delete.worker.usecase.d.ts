import { WorkerRepositoryInterface } from "src/domain/worker/worker.repository.interface";
export declare class DeleteWorkerUsecase {
    private workerRepository;
    constructor(workerRepository: WorkerRepositoryInterface);
    execute(id: string): Promise<void>;
}
