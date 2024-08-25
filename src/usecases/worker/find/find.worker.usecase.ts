import { Worker } from "../../../domain/worker/worker";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { InputFindWorkerDto, OutputFindWorkerDto } from "./find.worker.dto";



export class FindWorker {
    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface) {
        this.workerRepository = workerRepository;
    }

    public async execute(dto: InputFindWorkerDto): Promise<OutputFindWorkerDto> {
        let worker = await this.workerRepository.find(dto.id) as Worker;
        let output = {} as OutputFindWorkerDto;
        if(worker){
            output = {
                birthday : worker.getBirthday(),
                name: worker.getName(),
                createdAt: worker.getCreatedAt(),
                id: worker.getId(),
                role: worker.getRole(),
                udpatedAt: worker.getUpdatedAt()
            }
        }
        return output;
    }
}