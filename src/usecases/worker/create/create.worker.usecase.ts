import { ClassRepositoryInterface } from '../../../domain/class/class.repository.interface';
import { WorkerRepositoryInterface } from '../../../domain/worker/worker.repository.interface';
import { WorkerEntity } from '../../../infrastructure/entities/worker/worker.entity';
import { Worker } from '../../../domain/worker/worker';
import { InputCreateWorkerDto } from './create.worker.dto';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';


export default class CreateWorkerUseCase {

    private workerRepository: WorkerRepositoryInterface
    //private schoolGroupRepository: ClassRepositoryInterface;

    constructor(
        workerRepository: WorkerRepositoryInterface,
        //schoolGroupRepository: ClassRepository,
    ){
        this.workerRepository = workerRepository;
        //this.schoolGroupRepository = schoolGroupRepository;
    }

    public async execute(input: InputCreateWorkerDto){
        try {
            let worker = new Worker(input.birthday, input.name, input.role);
            let model = WorkerEntity.toWorkerEntity(worker);
            //let test = this.schoolGroupRepository as ClassRepository;
            //let schoolGroup = await test.findByClassCode(input.classCode);
            model.classes = [];
            //model.classes.push(schoolGroup);
            await this.workerRepository.create(model);
        } catch (error) {
            throw error;
        }
    }
}