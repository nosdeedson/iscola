import { ClassRepositoryInterface } from 'src/domain/class/class.repository.interface';
import { WorkerModel } from "src/infrastructure/repository/worker/worker.model";
import { WorkerRepositoryInterface } from '../../../domain/worker/worker.repository.interface';


export default class CreateWorkerUseCase {

    private workerRepository: WorkerRepositoryInterface
    private schoolGroup: ClassRepositoryInterface;

    constructor(
        workerRepository: WorkerRepositoryInterface,
        schooGroup: ClassRepositoryInterface
    ){
        this.workerRepository = workerRepository;
        this.schoolGroup = schooGroup;
    }

    public async execute(model: WorkerModel){
        try {
            this.workerRepository.create(model);
        } catch (error) {
            throw error;
        }
    }
}