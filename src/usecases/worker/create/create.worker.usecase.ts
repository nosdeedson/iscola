import { InputCreateWorkerDto } from "./create.worker.dto";
import { WorkerRepositoryInterface } from '../../../domain/worker/worker.repository.interface';
import { Worker } from "../../../domain/worker/worker";


export default class CreateWorkerUseCase {

    private workerRepository: WorkerRepositoryInterface

    constructor(workerRepository: WorkerRepositoryInterface){
        this.workerRepository = workerRepository;
    }

    public async execute(dto: InputCreateWorkerDto){

        let worker: Worker = new Worker(dto.birthday, dto.name, dto.role);

        if(worker.getNotification()?.hasError()){
            throw new Error(worker.getNotification().messages());
        }

        try {
            this.workerRepository.create(worker);
        } catch (error) {
            throw error;
        }
    }
}