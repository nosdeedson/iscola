import { Entity } from "../@shared/entity";
import { Student } from "../student/student";
import { Worker } from '../worker/worker'
import { ClassValidator } from './class.validator'

export class Class extends Entity {
    // TODO add another atribute time for the second day of class
    // TODO the class day should not be the same with time is equal

    classCode: string;
    nameBook: string;
    name: string;
    firstDayOfClassInWeek: string;
    secondDayOfClassInWeek: string;
    time: string;
    teacher: Worker;
    students: Student[];

    constructor(
        classCode: string,
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
        this.classCode = classCode;
        this.nameBook = nameBook;
        this.name = name;
        this.firstDayOfClassInWeek = firstDayOfWeek;
        this.secondDayOfClassInWeek = secondDayOfWeek;
        this.time = time;
        this.students = [];
        this.validate();
    }

    validate(){
        new ClassValidator().validate(this);
    }

    getClassCode(): string {
        return this.classCode;
    }

    getNameBook(): string {
        return this.nameBook
    }

    getName(): string {
        return this.name
    }

    getFirstDayOfClassInWeek(): string {
        return this.firstDayOfClassInWeek;
    }

    getSecondDayOfClassInWeek(): string {
        return this.secondDayOfClassInWeek;
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