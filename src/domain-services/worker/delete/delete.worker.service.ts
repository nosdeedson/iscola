import { DeleteGenericService } from "src/domain-services/@shared/delete-generic-service";
import { WorkerRepositoryInterface } from "src/domain/worker/worker.repository.interface";

export class DeleteWorkerService extends DeleteGenericService{

    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface) {
        super();
        this.workerRepository = workerRepository;
    }

    async execute(id: string) {
        this.workerRepository.delete(id);
    }
}