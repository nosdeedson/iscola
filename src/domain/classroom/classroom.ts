import { Entity } from "../@shared/entity";
import { Student } from "../student/student";
import { Worker } from '../worker/worker'
import { ClassroomValidator } from './classroom.validator'

export class Classroom extends Entity {

    classroomCode: string;
    nameBook: string;
    name: string;
    firstDayOfWeek: string;
    secondDayOfWeek: string;
    time: string;
    teacher: Worker;
    students: Student[];

    constructor(
        classroomCode: string,
        nameBook: string,
        name: string,
        firstDayOfWeek: string,
        secondDayOfWeek: string,
        time: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date
    ) {
        super(id, createdAt, updatedAt, deletedAt);
        this.classroomCode = classroomCode;
        this.nameBook = nameBook;
        this.name = name;
        this.firstDayOfWeek = firstDayOfWeek;
        this.secondDayOfWeek = secondDayOfWeek;
        this.time = time;
        this.students = [];
        this.validate();
    }

    validate(){
        new ClassroomValidator().validate(this);
    }

    getClassroomCode(): string {
        return this.classroomCode;
    }

    getNameBook(): string {
        return this.nameBook
    }

    getName(): string {
        return this.name
    }

    getFirstDayOfWeek(): string {
        return this.firstDayOfWeek;
    }

    getSecondDayOfWeek(): string {
        return this.secondDayOfWeek;
    }

    getTime(): string {
        return this.time
    }

    getTeacher(): Worker{
        return this.teacher
    }

    setTeacher(teacher: Worker){
        this.teacher = teacher;
    }

    getStudents(): Student[]{
        return this.students;
    }

    setStudent(student: Student){
        this.students.push(student);
    }

    setStudents(students: Student[]){
        students.forEach(it => this.setStudent(it));
    }
}