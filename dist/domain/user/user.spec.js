"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleEnum_1 = require("../worker/roleEnum");
const worker_1 = require("../worker/worker");
const user_1 = require("./user");
describe('User unit tests', () => {
    let teacher;
    beforeEach(() => {
        const expectedBirthDay = new Date();
        const expectedName = 'edson';
        const expectedRole = roleEnum_1.RoleEnum.TEACHER;
        teacher = new worker_1.Worker(expectedBirthDay, expectedName, expectedRole);
    });
    it('should instantiate a User without error', () => {
        const user = new user_1.User(teacher, 'email@email', 'nickname', 'password', 'teacher');
        expect(user.notification?.getErrors().length).toBe(0);
        expect(user.getCreatedAt()).toBeDefined();
        expect(user.getUpdatedAt()).toBeDefined();
        expect(user.getDeletedAt()).toBeUndefined();
        expect(user.getAccessType()).toBeDefined();
        expect(user.getEmail()).toBeDefined();
        expect(user.getNickname()).toBeDefined();
        expect(user.getPassword()).toBeDefined();
        expect(user.getAccessType()).toBeDefined();
    });
    it('notification should inform teacher undefined', () => {
        let person;
        const user = new user_1.User(person, 'email@email', 'nickname', 'password', 'teacher');
        expect(user).toBeDefined();
        expect(user.notification?.getErrors().length).toBe(1);
        expect(user.notification?.messages()).toBe('user: Person of user is undefined,');
    });
    it('notification should inform email undefined', () => {
        let email;
        const user = new user_1.User(teacher, email, 'nickname', 'password', 'teacher');
        expect(user).toBeDefined();
        expect(user.notification?.getErrors().length).toBe(1);
        expect(user.notification?.messages()).toBe('user: email of user is undefined,');
    });
    it('notification should inform nickname undefined', () => {
        let nickname;
        const user = new user_1.User(teacher, 'email@email', nickname, 'password', 'teacher');
        expect(user).toBeDefined();
        expect(user.notification?.getErrors().length).toBe(1);
        expect(user.notification?.messages()).toBe('user: nickname of user is undefined,');
    });
    it('notification should inform password undefined', () => {
        let password;
        const user = new user_1.User(teacher, 'email@email', 'nickname', password, 'teacher');
        expect(user).toBeDefined();
        expect(user.notification?.getErrors().length).toBe(1);
        expect(user.notification?.messages()).toBe('user: password of user is undefined,');
    });
    it('notification should inform accessType undefined', () => {
        let accessType;
        const user = new user_1.User(teacher, 'email@email', 'nickname', 'password', accessType);
        expect(user).toBeDefined();
        expect(user.notification?.getErrors().length).toBe(1);
        expect(user.notification?.messages()).toBe('user: accessType of user is undefined,');
    });
    it('notification should have 5 errors', () => {
        let email;
        let nickname;
        let password;
        let accessType;
        let person;
        const user = new user_1.User(person, email, nickname, password, accessType);
        expect(user).toBeDefined();
        expect(user.notification?.getErrors().length).toBe(5);
        expect(user.notification?.messages()).toBe(`user: Person of user is undefined,user: email of user is undefined,user: nickname of user is undefined,user: password of user is undefined,user: accessType of user is undefined,`);
    });
});
//# sourceMappingURL=user.spec.js.map