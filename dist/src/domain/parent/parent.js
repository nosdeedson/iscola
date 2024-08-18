"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const person_1 = require("../@shared/person");
const parent_validator_1 = require("./parent.validator");
class Parent extends person_1.Person {
    constructor(birthday, name, students, id, createdAt, updatedAt, deletedAt) {
        super(birthday, name, id, createdAt, updatedAt, deletedAt);
        this.students = students;
        this.validate();
    }
    validate() {
        new parent_validator_1.ParentValidator().validate(this);
    }
    getStudents() {
        return this.students;
    }
}
exports.Parent = Parent;
//# sourceMappingURL=parent.js.map