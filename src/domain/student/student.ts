import { Parent } from "../parent/parent";
import { Person } from "../@shared/person";
import { StudentValidator } from "./student.validator";
import { Rating } from "../rating/rating";
import { Classroom } from "../classroom/classroom";

export class Student extends Person {

    enrolled: string;
    parents: Parent[];
    ratings: Rating[];
    classroom: Classroom;

    constructor(
        birthday: Date,
        name: string,
        enrolled: string,
        parents: Parent[],
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    ) {
        super(birthday, name,
            id, 
            createdAt, 
            updatedAt, 
            deletedAt)
        this.enrolled = enrolled;
        this.parents = parents;
        this.validate()
    }

    validate(): void{
        new StudentValidator().validate(this);
    }

    getParents(): Parent[] {
        return this.parents
    }

    getEnrolled(): string {
        return this.enrolled;
    }

}