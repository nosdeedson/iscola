"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const person_1 = require("../@shared/person");
const worker_validator_1 = require("./worker.validator");
class Worker extends person_1.Person {
    constructor(birthday, name, role, id, createdAt, updatedAt, deletedAt) {
        super(birthday, name, id, createdAt, updatedAt, deletedAt);
        this.role = role;
        this.validate();
    }
    validate() {
        new worker_validator_1.TeacherValidator().validate(this);
    }
    getRole() {
        return this.role;
    }
}
exports.Worker = Worker;
//# sourceMappingURL=worker.js.map