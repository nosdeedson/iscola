import { SystemError } from "src/domain-services/@shared/system-error";
import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { Student } from "src/domain/student/student";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { CreateParentDto } from "./create.parent.dto";

export class CreateParentService{
    
    private parentRepository: ParentReporitoryInterface;

    constructor(
        parentRepository: ParentReporitoryInterface,
    ){
        this.parentRepository = parentRepository;
    }

    async execute(dto: CreateParentDto, students: Student[]){
        try {
            let parent = CreateParentDto.toParent(dto, students);
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