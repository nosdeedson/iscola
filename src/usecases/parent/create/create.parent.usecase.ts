import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { CreateParentDto } from "./create.parent.dto";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { SystemError } from "src/usecases/@shared/system-error";
import { StudentRepositoryInterface } from "src/domain/student/student.repository.interface";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";
import { Student } from "src/domain/student/student";

export class CreateParentUseCase{
    
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