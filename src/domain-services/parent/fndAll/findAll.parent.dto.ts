import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { FindParentDto } from "../find/find.parent.dto";
import { PersonEntity } from "src/infrastructure/entities/@shared/person.entity";

export class FindAllParentDto{
    all: FindParentDto[] = [];

    constructor(entities: ParentEntity[]){
        entities.map(it => {
            let dto = FindParentDto.toDto(it);
            this.all.push(dto);
        })
    }
}