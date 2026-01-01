import { Parent } from "src/domain/parent/parent";
import { Student } from "src/domain/student/student";

export class CreateParentDto {
    birthday: Date;
    name: string;
    students: Student[]

    constructor(
        birthday: Date,
        name: string,
    ) {
        this.birthday = birthday;
        this.name = name;
    }

    static toParent(dto: CreateParentDto): Parent {
        let parent = new Parent(dto.birthday, dto.name, dto.students);
        return parent;
    }
}
