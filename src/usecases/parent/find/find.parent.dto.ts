import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";

export class FindParentDto {

    id:string;
    name: string;
    createdAt : Date;
    studentsIds?: string[] = [];

    static toDto(entity: ParentEntity): FindParentDto{
        let dto = new FindParentDto();
        dto.id = entity.id;
        dto.name = entity.fullName;
        dto.createdAt = entity.createdAt;
        if(entity?.students){
            entity?.students.map(it => {
                dto.studentsIds.push(it.id)
            });
        }
        return dto;
    }

}