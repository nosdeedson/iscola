"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const uuid_1 = require("uuid");
const notification_1 = require("./notification/notification");
class Entity {
    constructor(id, createdAt, updatedAt, deletedAt) {
        this.id = id ? id : (0, uuid_1.v4)().toString();
        this.createdAt = createdAt ? createdAt : new Date();
        this.updatedAt = updatedAt ? updatedAt : new Date();
        this.deletedAt = deletedAt;
        this.notification = new notification_1.Notification();
    }
    getId() {
        return this.id;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getDeletedAt() {
        return this.deletedAt;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map