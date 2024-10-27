import { ClassRepositoryInterface } from "src/domain/class/class.repository.interface";

export class DeleteClassUseCase{

    private classRepository: ClassRepositoryInterface;

    constructor(classRepository: ClassRepositoryInterface){
        this.classRepository = classRepository;
    }

    async execute(id: string){
        await this.classRepository.delete(id);
    }
}