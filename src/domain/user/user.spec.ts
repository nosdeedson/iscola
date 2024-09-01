import { RoleEnum } from "../worker/roleEnum";
import { Worker } from '../worker/worker'
import { AccessType } from "./access.type";
import { User } from "./user";

describe('User unit tests', () => {

    let teacher;

    beforeEach(() => {
        const expectedBirthDay = new Date();
        const expectedName = 'edson';
        const expectedRole = RoleEnum.TEACHER;
        teacher = new Worker(expectedBirthDay, expectedName, expectedRole);
    })

    it('should instantiate a User without error', () => {
        const user = new User(teacher, 'email@email', 'nickname', 'password', AccessType.TEACHER);
        expect(user.getNotification()?.getErrors().length).toBe(0);
        expect(user.getCreatedAt()).toBeDefined()
        expect(user.getUpdatedAt()).toBeDefined()
        expect(user.getDeletedAt()).toBeUndefined()
        expect(user.getAccessType()).toBeDefined()
        expect(user.getEmail()).toBeDefined()
        expect(user.getNickname()).toBeDefined()
        expect(user.getPassword()).toBeDefined()
        expect(user.getAccessType()).toBeDefined()
    })

    it('notification should inform teacher undefined', () =>{
        let person;
        const user = new User(person, 'email@email', 'nickname', 'password', AccessType.TEACHER);
        expect(user).toBeDefined();
        expect(user.getNotification()?.getErrors().length).toBe(1);
        expect(user.getNotification()?.messages()).toBe('user: Person of user is undefined,');
    })

    it('notification should inform email undefined', () =>{
        let email;
        const user = new User(teacher, email, 'nickname', 'password', AccessType.TEACHER);
        expect(user).toBeDefined();
        expect(user.getNotification()?.getErrors().length).toBe(1);
        expect(user.getNotification()?.messages()).toBe('user: email of user is undefined,');
    })

    it('notification should inform nickname undefined', () =>{
        let nickname;
        const user = new User(teacher, 'email@email', nickname, 'password', AccessType.TEACHER);
        expect(user).toBeDefined();
        expect(user.getNotification()?.getErrors().length).toBe(1);
        expect(user.getNotification()?.messages()).toBe('user: nickname of user is undefined,');
    })

    it('notification should inform password undefined', () =>{
        let password;
        const user = new User(teacher, 'email@email', 'nickname', password, AccessType.TEACHER);
        expect(user).toBeDefined();
        expect(user.getNotification()?.getErrors().length).toBe(1);
        expect(user.getNotification()?.messages()).toBe('user: password of user is undefined,');
    })

    it('notification should inform accessType undefined', () =>{
        let accessType;
        const user = new User(teacher, 'email@email', 'nickname', 'password', accessType);
        expect(user).toBeDefined();
        expect(user.getNotification()?.getErrors().length).toBe(1);
        expect(user.getNotification()?.messages()).toBe('user: accessType of user is undefined,');
    })

    it('notification should have 5 errors', () => {
        let email;
        let nickname;
        let password;
        let accessType;
        let person;
        const user = new User(person, email, nickname, password, accessType);
        expect(user).toBeDefined();
        expect(user.getNotification()?.getErrors().length).toBe(5);
        expect(user.getNotification()?.messages()).toBe(`user: Person of user is undefined,user: email of user is undefined,user: nickname of user is undefined,user: password of user is undefined,user: accessType of user is undefined,`);
    })

})