"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const entity_1 = require("../@shared/entity");
class Person extends entity_1.Entity {
    constructor(birthday, name, id, createdAt, updatedAt, deletedAt) {
        super(id, createdAt, updatedAt, deletedAt);
        this.birthday = birthday;
        this.name = name;
    }
    getBirthDay() {
        return this.birthday;
    }
    getName() {
        return this.name;
    }
}
exports.Person = Person;
//# sourceMappingURL=person.js.map