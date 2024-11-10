import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { FindAllParentDto } from "./findAll.parent.dto";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";

export class FindAllParentUseCase{

    private parentRepository: ParentReporitoryInterface;

    constructor(parentRepository: ParentReporitoryInterface){
        this.parentRepository = parentRepository;
    }

    async execute(): Promise<FindAllParentDto>{
        let entities = await this.parentRepository.findAll() as ParentEntity[];
        let results = new FindAllParentDto(entities);
        return results;
    }

}