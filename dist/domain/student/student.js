"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const person_1 = require("../@shared/person");
const student_validator_1 = require("./student.validator");
class Student extends person_1.Person {
    constructor(birthday, name, enrolled, parents, id, createdAt, updatedAt, deletedAt) {
        super(birthday, name, id, createdAt, updatedAt, deletedAt);
        this.enrolled = enrolled;
        this.parents = parents;
        this.validate();
    }
    validate() {
        new student_validator_1.StudentValidator().validate(this);
    }
    getParents() {
        return this.parents;
    }
    getEnrolled() {
        return this.enrolled;
    }
}
exports.Student = Student;
//# sourceMappingURL=student.js.map