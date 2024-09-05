import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { OutputFindWorkerDto } from "../find/find.worker.dto";
import { OutputFindAllWorkerDto } from "./list.worker.dto";

export class FindAllWorker {

    // private workerRepository: WorkerRepositoryInterface;

    // constructor(workerRepository: WorkerRepositoryInterface) {
    //     this.workerRepository = workerRepository;
    // }

    // public async execute(): Promise<OutputFindAllWorkerDto> {
    //     // TODO IMPLEMENT
    //     // let workers = await this.workerRepository.findAll();
        
    //     // let results : OutputFindAllWorkerDto =  { 
    //     //     all: workers.map(it =>{
    //     //         let output: OutputFindWorkerDto = {
    //     //             birthday: it.getBirthday(),
    //     //             createdAt: it.getCreatedAt(),
    //     //             id: it.getId(),
    //     //             name: it.getName(),
    //     //             role: it.getRole(),
    //     //             udpatedAt: it.getUpdatedAt()
    //     //         } 
    //     //         return output;
    //     //     })
    //     // };

    //     return null;
    // }
}