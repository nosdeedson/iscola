import { Parent } from "src/domain/parent/parent";
import { Student } from "src/domain/student/student";

export class CreateParentDto {
    birthday: Date;
    name: string;

    constructor(
        birthday: Date,
        name: string,
    ) {
        this.birthday = birthday;
        this.name = name;
    }

    static toParent(dto: CreateParentDto, students: Student[]): Parent {
        let parent = new Parent(dto.birthday, dto.name, students);
        return parent;
    }
}
