import { Parent } from "../parent/parent";
import { RoleEnum } from "../worker/roleEnum";
import { Student } from "./student";

describe("student unit tests", () =>{

    it('should instantiate a student', () =>{
        const parent = new Parent(
            new Date,
            'Maria',
            []
        )
        let parents = [parent];
        let birthday = new Date();
        let name = 'edson';
        let enrolled = '123'
        let student = new Student(
            birthday,
            name,
            enrolled,
            parents
        );
        

        expect(student.getId()).toBeDefined();
        expect(student.getName()).toBeDefined();
        expect(student.getBirthDay()).toBeDefined();
        expect(student.getCreatedAt()).toBeDefined();
        expect(student.getUpdatedAt()).toBeDefined();
        expect(student.getDeletedAt()).toBeUndefined();
        expect(student.getEnrolled()).toBeDefined();
        expect(student.getParents()).toBeDefined();
        expect(student.getParents().length).toBeGreaterThan(0);
    });

    it('should have error if name empty', () =>{
        let birthday = new Date();
        let name;
        const parent = new Parent(
            new Date,
            'Maria',
            []
        )
        let parents = [parent];
        let enrolled = '123'
        let student = new Student(
            birthday,
            name,
            enrolled,
            parents
        );

        expect(student.notification?.getErrors().length).toBe(1)
        expect(student.notification?.getErrors()[0].message).toBe('Name should not be null')
        expect(student.notification?.messages('student')).toBe('student: Name should not be null,')
    })

    it('should have error if birthday empty', () =>{
        let birthday;
        let name = 'edson';
        const parent = new Parent(
            new Date,
            'Maria',
            []
        )
        let parents = [parent];
        let enrolled = '123'
        let student = new Student(
            birthday,
            name,
            enrolled,
            parents
        );

        expect(student.notification?.getErrors().length).toBe(1)
        expect(student.notification?.getErrors()[0].message).toBe('Birthday should not be null')
        expect(student.notification?.messages('student')).toBe('student: Birthday should not be null,')
    })

    it('should have error if enrolled empty', () =>{
        let birthday = new Date();
        let name = 'edson';
        const parent = new Parent(
            new Date,
            'Maria',
            []
        )
        let parents = [parent];
        let enrolled;
        let student = new Student(
            birthday,
            name,
            enrolled,
            parents
        );

        expect(student.notification?.getErrors().length).toBe(1)
        expect(student.notification?.getErrors()[0].message).toBe('Enrolled should not be null')
        expect(student.notification?.messages('student')).toBe('student: Enrolled should not be null,')
    })

    it('should have error if parents empty', () =>{
        let birthday = new Date();
        let name = 'edson';
        let parents = [];
        let enrolled = '123'
        let student = new Student(
            birthday,
            name,
            enrolled,
            parents
        );

        expect(student.notification?.getErrors().length).toBe(1)
        expect(student.notification?.getErrors()[0].message).toBe('parents field must have at least 1 items')
        expect(student.notification?.messages('student')).toBe('student: parents field must have at least 1 items,')
    })

    it('should have two errors', () =>{
        let birthday;
        let name;
        const parent = new Parent(
            new Date,
            'Maria',
            []
        )
        let parents = [parent];
        let enrolled = '123'
        let student = new Student(
            birthday,
            name,
            enrolled,
            parents
        );

        expect(student.notification?.getErrors().length).toBe(2)
        expect(student.notification?.getErrors()[0].message).toBe('Name should not be null')
        expect(student.notification?.getErrors()[1].message).toBe('Birthday should not be null')
        expect(student.notification?.messages('student')).toBe('student: Name should not be null,student: Birthday should not be null,')
    })

})