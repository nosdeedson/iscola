"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_helper_1 = require("../../helpers/date/date.helper");
const parent_1 = require("../parent/parent");
const student_1 = require("../student/student");
const roleEnum_1 = require("../worker/roleEnum");
const worker_1 = require("../worker/worker");
const classroom_1 = require("./classroom");
describe('Classroom tests units', () => {
    it('Verify validate is called', () => {
        const classroomFile = jest.spyOn(classroom_1.Classroom.prototype, 'validate')
            .mockImplementationOnce(() => {
            console.log('mocked');
        });
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        classroom.validate();
        expect(classroomFile).toHaveBeenCalled();
    });
    it('Should instantiate a classroom', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getCreatedAt()).toBeDefined();
        expect(classroom.getUpdatedAt()).toBeDefined();
        expect(classroom.getId()).toBeDefined();
        expect(classroom.getDeletedAt()).toBeUndefined();
        expect(classroom.getName()).toBeDefined();
        expect(classroom.getNameBook()).toBeDefined();
        expect(classroom.getClassroomCode()).toBeDefined();
        expect(classroom.getClassroomCode()).toBeDefined();
        expect(classroom.getTeacher()).toBeUndefined();
        expect(classroom.getStudents().length).toBe(0);
    });
    it('should have notification with classroom code empty', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let classroomCode;
        const classroom = new classroom_1.Classroom(classroomCode, 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Classroom code is required,");
    });
    it('should have notification with classroom book is empty ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let bookName;
        const classroom = new classroom_1.Classroom('123', bookName, 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Name of the book is required,");
    });
    it('should have notification with classroom name is empty ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let name;
        const classroom = new classroom_1.Classroom('123', 'bookName', name, date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Name of the class is required,");
    });
    it('should have notification with classroom firstDayOfWeek is empty ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let firstDayOfWeek;
        const classroom = new classroom_1.Classroom('123', 'bookName', 'name', firstDayOfWeek, date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: First day of lessons is required,");
    });
    it('should have notification with classroom secondDayOfWeek is empty ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let secondDayOfWeek;
        const classroom = new classroom_1.Classroom('123', 'bookName', 'name', date_helper_1.DateHelper.getDayOfweek(aValidDate), secondDayOfWeek, '08:00');
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Second day of lessons is required,");
    });
    it('should have notification with classroom time is empty ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let time;
        const classroom = new classroom_1.Classroom('123', 'bookName', 'name', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), time);
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Time of lessons is required,");
    });
    it('should have six errors in notification', () => {
        let code;
        let bookName;
        let name;
        let firstDayOfWeek;
        let secondDayOfWeek;
        let time;
        const classroom = new classroom_1.Classroom(code, bookName, name, firstDayOfWeek, secondDayOfWeek, time);
        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.getErrors().length).toBe(6);
        expect(classroom.notification?.messages()).toBe("classroom: Classroom code is required,classroom: Name of the book is required,classroom: Name of the class is required,classroom: First day of lessons is required,classroom: Second day of lessons is required,classroom: Time of lessons is required,");
    });
    it('should have at least one student', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const parent = new parent_1.Parent(new Date, 'Maria', []);
        let parents = [parent];
        let birthday = new Date();
        let name = 'edson';
        let enrolled = '123';
        let student = new student_1.Student(birthday, name, enrolled, parents);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        classroom.setStudent(student);
        expect(classroom).toBeDefined();
        expect(classroom.getStudents().length).toBe(1);
        expect(classroom.notification?.getErrors().length).toBe(0);
    });
    it('should instantiate a classroom with a teacher', () => {
        const expectedBirthDay = new Date();
        const expectedName = 'edson';
        const expectedRole = roleEnum_1.RoleEnum.TEACHER;
        const teacher = new worker_1.Worker(expectedBirthDay, expectedName, expectedRole);
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        classroom.setTeacher(teacher);
        expect(classroom).toBeDefined();
        expect(classroom.getTeacher()).toBeDefined();
        expect(classroom.notification?.getErrors().length).toBe(0);
    });
    it('should have a notification with one error firstDayOfWeek incorrect', () => {
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(inValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom).toBeDefined();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: firstDayOfWeek must be a weekday,");
    });
    it('should have a notification with one error secondDayOfWeek incorrect', () => {
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(inValidDate), '08:00');
        expect(classroom).toBeDefined();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: secondDayOfWeek must be a weekday,");
    });
    it('should have a notification with one error firstDayOfWeek incorrect', () => {
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(inValidDate), date_helper_1.DateHelper.getDayOfweek(inValidDate), '08:00');
        expect(classroom).toBeDefined();
        expect(classroom.notification?.getErrors().length).toBe(2);
        expect(classroom.notification?.messages()).toBe("classroom: firstDayOfWeek must be a weekday,classroom: secondDayOfWeek must be a weekday,");
    });
    it('Should get classroom code ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getClassroomCode()).toBe('123');
    });
    it('Should get name book code ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getNameBook()).toBe('book');
    });
    it('Should get name code ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getName()).toBe('A1');
    });
    it('Should get firstDayofweek code ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getFirstDayOfWeek()).toEqual('Friday');
    });
    it('Should get secondDayofweek code ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getSecondDayOfWeek()).toEqual('Friday');
    });
    it('Should get time code ', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        expect(classroom.getTime()).toBe('08:00');
    });
    it('should have at least one student', () => {
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const parent = new parent_1.Parent(new Date, 'Maria', []);
        let parents = [parent];
        let birthday = new Date();
        let name = 'edson';
        let enrolled = '123';
        let student = new student_1.Student(birthday, name, enrolled, parents);
        const classroom = new classroom_1.Classroom('123', 'book', 'A1', date_helper_1.DateHelper.getDayOfweek(aValidDate), date_helper_1.DateHelper.getDayOfweek(aValidDate), '08:00');
        let students = [];
        students.push(student);
        classroom.setStudents(students);
        expect(classroom).toBeDefined();
        expect(classroom.getStudents().length).toBe(1);
        expect(classroom.notification?.getErrors().length).toBe(0);
    });
});
//# sourceMappingURL=classroom.spec.js.map