"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationError = void 0;
class NotificationError extends Error {
    constructor(errors) {
        super(errors.map((error) => `${error.context} : ${error.message}`).join(','));
        this.errors = errors;
    }
}
exports.NotificationError = NotificationError;
//# sourceMappingURL=notification.error.js.map