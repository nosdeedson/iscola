import { ClassRepositoryInterface } from '../../../domain/class/class.repository.interface';
import { WorkerRepositoryInterface } from '../../../domain/worker/worker.repository.interface';
import { WorkerEntity } from '../../../infrastructure/entities/worker/worker.entity';
import { Worker } from '../../../domain/worker/worker';
import { InputCreateWorkerDto } from './create.worker.dto';


export default class CreateWorkerUseCase {

    private workerRepository: WorkerRepositoryInterface
    private schoolGroup: ClassRepositoryInterface;

    constructor(
        workerRepository: WorkerRepositoryInterface
    ){
        this.workerRepository = workerRepository;
    }

    public async execute(input: InputCreateWorkerDto){
        try {
            let worker = new Worker(input.birthday, input.name, input.role);
            let model = WorkerEntity.toWorkerEntity(worker);
            await this.workerRepository.create(model);
        } catch (error) {
            throw error;
        }
    }
}