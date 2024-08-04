import { Person } from "../@shared/person";
import { Student } from "../student/student";
import { ParentValidator } from "./parent.validator";

export class Parent extends Person{

    students: Student[]

    constructor(
        birthday: Date,
        name: string,
        students: Student[],
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    ) {
        super(birthday, name, id, createdAt, updatedAt, deletedAt, )
        this.students = students;
        this.validate();
    }

    validate(): void{
        new ParentValidator().validate(this);
    }

    getStudents(): Student[]{
        return this.students;
    }
    
}