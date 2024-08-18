import { Entity } from "../@shared/entity";
import { Student } from "../student/student";
import { Worker } from '../worker/worker';
export declare class Classroom extends Entity {
    classroomCode: string;
    nameBook: string;
    name: string;
    firstDayOfWeek: string;
    secondDayOfWeek: string;
    time: string;
    teacher: Worker;
    students: Student[];
    constructor(classroomCode: string, nameBook: string, name: string, firstDayOfWeek: string, secondDayOfWeek: string, time: string, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getClassroomCode(): string;
    getNameBook(): string;
    getName(): string;
    getFirstDayOfWeek(): string;
    getSecondDayOfWeek(): string;
    getTime(): string;
    getTeacher(): Worker;
    setTeacher(teacher: Worker): void;
    getStudents(): Student[];
    setStudent(student: Student): void;
    setStudents(students: Student[]): void;
}
