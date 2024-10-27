import { ClassRepositoryInterface } from "src/domain/class/class.repository.interface";
import { FindClassDto } from "./find.class.dto";
import { SystemError } from "src/usecases/@shared/system-error";

export class FindClassUseCase{

    private classRepository: ClassRepositoryInterface;

    constructor(classRepository: ClassRepositoryInterface){
        this.classRepository = classRepository;
    }

    async execute(id: string): Promise<FindClassDto>{
        let schoolgroup = await this.classRepository.find(id);
        if(!schoolgroup){
            throw new SystemError([{context: 'class', message: 'class not found'}])
        }
        let dto = FindClassDto.toDto(schoolgroup);
        return dto;
    }

}