import { Parent } from "src/domain/parent/parent";
import { Student } from "src/domain/student/student";

export class CreateParentDto {
    birthday: Date;
    name: string;
    students: string[]

    constructor(
        birthday: Date,
        name: string,
        students: string[]
    ) {
        this.birthday = birthday;
        this.name = name;
        this.students = students;
    }

    static toParent(dto: CreateParentDto): Parent {
        // TODO FIX HERE students must be found be name
        let parent = new Parent(dto.birthday, dto.name, null);
        return parent;
    }
}
