import { Person } from "../@shared/person";
import { Student } from "../student/student";
export declare class Parent extends Person {
    students: Student[];
    constructor(birthday: Date, name: string, students: Student[], id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getStudents(): Student[];
}
