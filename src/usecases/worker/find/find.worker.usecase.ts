import { Worker } from "../../../domain/worker/worker";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { InputFindWorkerDto, OutputFindWorkerDto } from "./find.worker.dto";



export class FindWorker {
    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface) {
        this.workerRepository = workerRepository;
    }

    public async execute(dto: InputFindWorkerDto): Promise<OutputFindWorkerDto> {
        let worker = await this.workerRepository.find(dto.id);
        let output = {} as OutputFindWorkerDto;
        if(worker){
            output = {
                birthday : worker.birthday,
                name: worker.fullName,
                createdAt: worker.createdAt,
                id: worker.id,
                role: worker.role,
                udpatedAt: worker.updatedAt
            }
        }
        return output;
    }
}