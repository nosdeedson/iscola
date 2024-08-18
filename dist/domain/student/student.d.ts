import { Parent } from "../parent/parent";
import { Person } from "../@shared/person";
import { Rating } from "../rating/rating";
import { Classroom } from "../classroom/classroom";
export declare class Student extends Person {
    enrolled: string;
    parents: Parent[];
    ratings: Rating[];
    classroom: Classroom;
    constructor(birthday: Date, name: string, enrolled: string, parents: Parent[], id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getParents(): Parent[];
    getEnrolled(): string;
}
