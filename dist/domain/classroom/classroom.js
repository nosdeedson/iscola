"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classroom = void 0;
const entity_1 = require("../@shared/entity");
const classroom_validator_1 = require("./classroom.validator");
class Classroom extends entity_1.Entity {
    constructor(classroomCode, nameBook, name, firstDayOfWeek, secondDayOfWeek, time, id, createdAt, updatedAt, deletedAt) {
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
    validate() {
        new classroom_validator_1.ClassroomValidator().validate(this);
    }
    getClassroomCode() {
        return this.classroomCode;
    }
    getNameBook() {
        return this.nameBook;
    }
    getName() {
        return this.name;
    }
    getFirstDayOfWeek() {
        return this.firstDayOfWeek;
    }
    getSecondDayOfWeek() {
        return this.secondDayOfWeek;
    }
    getTime() {
        return this.time;
    }
    getTeacher() {
        return this.teacher;
    }
    setTeacher(teacher) {
        this.teacher = teacher;
    }
    getStudents() {
        return this.students;
    }
    setStudent(student) {
        this.students.push(student);
    }
    setStudents(students) {
        students.forEach(it => this.setStudent(it));
    }
}
exports.Classroom = Classroom;
//# sourceMappingURL=classroom.js.map