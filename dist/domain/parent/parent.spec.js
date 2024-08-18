"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const student_1 = require("../student/student");
const parent_1 = require("./parent");
describe('Parent unit tests', () => {
    it('should intantiate a Parent', () => {
        const student = new student_1.Student(new Date, 'Maria', '123', []);
        let students = [student];
        let birthday = new Date();
        let name = 'edson';
        let parent = new parent_1.Parent(birthday, name, students);
        expect(parent.getId()).toBeDefined();
        expect(parent.getName()).toBeDefined();
        expect(parent.getBirthDay()).toBeDefined();
        expect(parent.getCreatedAt()).toBeDefined();
        expect(parent.getUpdatedAt()).toBeDefined();
        expect(parent.getDeletedAt()).toBeUndefined();
        expect(parent.getStudents()).toBeDefined();
        expect(parent.getStudents().length).toBeGreaterThan(0);
    });
    it('should have error if name empty', () => {
        let birthday = new Date();
        let name;
        const student = new student_1.Student(new Date, 'Maria', '123', []);
        let students = [student];
        let parent = new parent_1.Parent(birthday, name, students);
        expect(parent.notification?.getErrors().length).toBe(1);
        expect(parent.notification?.getErrors()[0].message).toBe('Name should not be null');
        expect(parent.notification?.messages('parent')).toBe('parent: Name should not be null,');
    });
    it('should have error if birthday empty', () => {
        let birthday;
        let name = 'edson';
        const student = new student_1.Student(new Date, 'Maria', '123', []);
        let students = [student];
        let parent = new parent_1.Parent(birthday, name, students);
        expect(parent.notification?.getErrors().length).toBe(1);
        expect(parent.notification?.getErrors()[0].message).toBe('Birthday should not be null');
        expect(parent.notification?.messages('parent')).toBe('parent: Birthday should not be null,');
    });
    it('should have error if student empty', () => {
        let birthday = new Date();
        let name = 'edson';
        let students = [];
        let parent = new parent_1.Parent(birthday, name, students);
        expect(parent.notification?.getErrors().length).toBe(1);
        expect(parent.notification?.getErrors()[0].message).toBe('students field must have at least 1 items');
        expect(parent.notification?.messages('parent')).toBe('parent: students field must have at least 1 items,');
    });
});
//# sourceMappingURL=parent.spec.js.map