import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { CreateParentDto } from "./create.parent.dto";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { SystemError } from "src/usecases/@shared/system-error";

export class CreateParentUseCase{
    
    private parentRepository: ParentReporitoryInterface;

    constructor(parentRepository: ParentReporitoryInterface){
        this.parentRepository = parentRepository;
    }

    async execute(dto: CreateParentDto){
        try {
            let parent = CreateParentDto.toParent(dto);
            if(parent?.getNotification().hasError()){
                throw new SystemError(parent.getNotification()?.getErrors());
            }
            let entity = ParentEntity.toParentEntity(parent);
            await this.parentRepository.create(entity);
        } catch (error) {
            throw error;
        }
    }
}