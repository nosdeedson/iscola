import { SystemError } from 'src/usecases/@shared/system-error';
import { ClassRepositoryInterface } from '../../../domain/class/class.repository.interface';
import { Worker } from '../../../domain/worker/worker';
import { WorkerRepositoryInterface } from '../../../domain/worker/worker.repository.interface';
import { WorkerEntity } from '../../../infrastructure/entities/worker/worker.entity';
import { InputCreateWorkerDto } from './create.worker.dto';


export default class CreateWorkerUseCase {

    private workerRepository: WorkerRepositoryInterface
    private schoolGroupRepository: ClassRepositoryInterface;

    constructor(
        workerRepository: WorkerRepositoryInterface,
        schoolGroupRepository: ClassRepositoryInterface,
    ){
        this.workerRepository = workerRepository;
        this.schoolGroupRepository = schoolGroupRepository;
    }

    public async execute(input: InputCreateWorkerDto){
        try {
            let worker = new Worker(input.birthday, input.name, input.role);
            if(worker.getNotification()?.hasError()){
                throw new SystemError(worker.getNotification().getErrors());
            }
            let model = WorkerEntity.toWorkerEntity(worker);
            let schoolGroup = await this.schoolGroupRepository.findByClassCode(input.classCode);
            model.classes = [];
            model.classes.push(schoolGroup);
            await this.workerRepository.create(model);
        } catch (error) {
            throw error;
        }
    }
}