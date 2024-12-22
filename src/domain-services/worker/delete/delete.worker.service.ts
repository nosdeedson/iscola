import { WorkerRepositoryInterface } from "src/domain/worker/worker.repository.interface";

export class DeleteWorkerService {

    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface) {
        this.workerRepository = workerRepository;
    }

    async execute(id: string) {
        this.workerRepository.delete(id);
    }
}