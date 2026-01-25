import { SystemError } from "src/aplication/services/@shared/system-error";
import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { Student } from "src/domain/student/student";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { CreateParentDto } from "./create.parent.dto";
import { CreateGenericService } from "src/aplication/services/@shared/create-generic-service";

export class CreateParentService extends CreateGenericService{
    
    private parentRepository: ParentReporitoryInterface;

    constructor(
        parentRepository: ParentReporitoryInterface,
    ){
        super(parentRepository);
        this.parentRepository = parentRepository;
    }

    async execute(dto: CreateParentDto){
        try {
            const parentExist = await this.parentRepository.findByNames([dto.name], dto.students);
            if(parentExist){
                parentExist.forEach(parent => {
                   parent.birthday = dto.birthday;
                   if(parent.students){
                    parent.students.forEach(it => {
                        if(!dto.students.includes(it.fullName)){
                            throw new SystemError([{context: 'parent', message: 'the name of students do not match.'}]);
                        }
                    })
                   }
                });
            }
            let parent = CreateParentDto.toParent(dto);
            if(parent?.notification.hasError()){
                throw new SystemError(parent.notification?.getErrors());
            }
            let entity = ParentEntity.toParentEntity(parent);
            await this.parentRepository.create(entity);
        } catch (error) {
            throw error;
        }
    }
}