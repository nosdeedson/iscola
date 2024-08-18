"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    constructor() {
        this.errors = [];
    }
    addError(error) {
        this.errors.push(error);
    }
    hasError() {
        return this.errors.length > 0;
    }
    getErrors() {
        return this.errors;
    }
    messages(context) {
        let message = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map