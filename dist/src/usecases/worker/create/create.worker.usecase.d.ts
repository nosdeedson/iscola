import { InputCreateWorkerDto } from "./create.worker.dto";
import { WorkerRepositoryInterface } from '../../../domain/worker/worker.repository.interface';
export default class CreateWorkerUseCase {
    private workerRepository;
    constructor(workerRepository: WorkerRepositoryInterface);
    execute(dto: InputCreateWorkerDto): Promise<void>;
}
