import { WorkerEntity } from "src/infrastructure/entities/worker/worker.entity";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { OutputFindWorkerDto } from "../find/find.worker.dto";
import { OutputFindAllWorkerDto } from "./list.worker.dto";

export class FindAllWorker {

    private workerRepository: WorkerRepositoryInterface;

    constructor(workerRepository: WorkerRepositoryInterface) {
        this.workerRepository = workerRepository;
    }

    public async execute(): Promise<OutputFindAllWorkerDto> {
        let workers = await this.workerRepository.findAll();
        
        let results : OutputFindAllWorkerDto =  { 
            all: workers.map((it: WorkerEntity) =>{
                let output: OutputFindWorkerDto = {
                    birthday: it.birthday,
                    createdAt: it.createdAt,
                    id: it.id,
                    name: it.fullName,
                    role: it.role,
                    udpatedAt: it.updatedAt
                } 
                return output;
            })
        };

        return results;
    }
}