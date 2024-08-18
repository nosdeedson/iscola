"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_1 = require("../@shared/entity");
const user_validator_1 = require("./user.validator");
class User extends entity_1.Entity {
    constructor(person, email, nickname, password, accessType, id, createdAt, updatedAt, deletedAt) {
        super(id, createdAt, updatedAt, deletedAt);
        this.person = person;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.accessType = accessType;
        this.validate();
    }
    validate() {
        new user_validator_1.UserValidator().validate(this);
    }
    getPerson() {
        const person = this.person;
        return person;
    }
    getEmail() {
        const email = this.email;
        return email;
    }
    getNickname() {
        const nickname = this.nickname;
        return nickname;
    }
    getAccessType() {
        const accessType = this.accessType;
        return accessType;
    }
    getPassword() {
        const password = this.password;
        return password;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map