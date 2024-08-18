"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = require("./notification");
describe('Notification error unit test', () => {
    it('should create errors', () => {
        const notification = new notification_1.Notification();
        const error = {
            message: "error message",
            context: "student"
        };
        notification.addError(error);
        expect(notification.messages('student')).toBe("student: error message,");
        const error1 = {
            message: "another message",
            context: 'student'
        };
        notification.addError(error1);
        expect(notification.messages('student')).toBe('student: error message,student: another message,');
        const error2 = {
            message: "error message",
            context: "teacher"
        };
        notification.addError(error2);
        expect(notification.messages('teacher')).toBe('teacher: error message,');
        expect(notification.hasError()).toBeTruthy();
        expect(notification.getErrors().length).toBe(3);
    });
    it('notification should have errors ', () => {
        const notification = new notification_1.Notification();
        const error = {
            message: "error message",
            context: "student"
        };
        notification.addError(error);
        const error1 = {
            message: "another message",
            context: 'student'
        };
        notification.addError(error1);
        const error2 = {
            message: "error message",
            context: "teacher"
        };
        notification.addError(error2);
        expect(notification.hasError()).toBeTruthy();
        expect(notification.getErrors().length).toBe(3);
    });
    it('notification should have errors ', () => {
        const notification = new notification_1.Notification();
        const error = {
            message: "error message",
            context: "student"
        };
        notification.addError(error);
        const error1 = {
            message: "another message",
            context: 'student'
        };
        notification.addError(error1);
        const error2 = {
            message: "error message",
            context: "teacher"
        };
        notification.addError(error2);
        expect(notification.hasError()).toBeTruthy();
        expect(notification.getErrors()).toStrictEqual([error, error1, error2]);
    });
});
//# sourceMappingURL=notification.spec.js.map