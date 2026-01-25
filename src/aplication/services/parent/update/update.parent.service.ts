import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";
import { SystemError } from "src/aplication/services/@shared/system-error";

export class UpdateParentService{

    private parentRepository: ParentReporitoryInterface;

    constructor(parentRepository: ParentReporitoryInterface){
        this.parentRepository = parentRepository;
    }

    async execute(studentEntity: StudentEntity, parentId: string){
        try {   
            let parent = await this.parentRepository.find(parentId) as ParentEntity;
            if(!parent){
                throw new SystemError([{ context: 'parent', message: 'Parent not found'}]);
            }
            parent.students.push(studentEntity);
            await this.parentRepository.update(parent);
        } catch (error) {
            throw error;
        }
    }
}