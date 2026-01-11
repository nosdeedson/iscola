import { ParentEntity } from "src/infrastructure/entities/parent/parent.entity";
import { Person } from "../@shared/person";
import { Student } from "../student/student";
import { ParentValidator } from "./parent.validator";

export class Parent extends Person{
    
    private students: Student[]

    constructor(
        name: string,
        students: Student[],
        birthday?: Date,
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

    setStudents(students: Student[]){
        this.students = students;
    }

    static toDomain(parentEntity: ParentEntity): Parent {
        let students = [];
        if(parentEntity?.students && parentEntity?.students.length > 0){
            parentEntity.students.forEach(it => {
                students.push(Student.toDomain(it));
            })
        }

        return new Parent(
            parentEntity.fullName,
            students,
            parentEntity.birthday,
            parentEntity.id,
            parentEntity.createdAt,
            parentEntity.updatedAt,
            parentEntity.deletedAt,
        );
    }
    
}