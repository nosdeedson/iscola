import { WorkerRepositoryInterface } from "src/domain/worker/worker.repository.interface";

export class DeleteWorkerUsecase {

    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface) {
        this.workerRepository = workerRepository;
    }

    async execute(id: string) {
        this.workerRepository.delete(id);
    }
}