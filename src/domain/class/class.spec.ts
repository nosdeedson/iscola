import { DateHelper } from "../../helpers/date/date.helper"
import { Parent } from "../parent/parent";
import { Student } from "../student/student";
import { RoleEnum } from "../worker/roleEnum";
import { Worker } from "../worker/worker";
import { Class } from "./class"


describe('Class tests units', () => {


    it('Verify validate is called', () => {
        const classFile = jest.spyOn(Class.prototype, 'validate')
            .mockImplementationOnce(() => {
                console.log('mocked')
            })
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        c.validate()

        expect(classFile).toHaveBeenCalled();
    });


    it('Should instantiate a class', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getCreatedAt()).toBeDefined();
        expect(c.getUpdatedAt()).toBeDefined();
        expect(c.getId()).toBeDefined();
        expect(c.getDeletedAt()).toBeUndefined();
        expect(c.getName()).toBeDefined();
        expect(c.getNameBook()).toBeDefined();
        expect(c.getClassCode()).toBeDefined();
        expect(c.getTeacher()).toBeUndefined();
        expect(c.getStudents().length).toBe(0);
    });

    it('should have notification with class code empty', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let cCode;
        const c = new Class(
            cCode,
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: classcode is required,");

    })

    it('should have notification with class book is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let bookName;
        const c = new Class(
            '123',
            bookName,
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Name of the book is required,");
    })

    it('should have notification with class name is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let name;
        const c = new Class(
            '123',
            'bookName',
            name,
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Name of the class is required,");
    })

    it('should have notification with class firstDayOfWeek is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let firstDayOfWeek;
        const c = new Class(
            '123',
            'bookName',
            'name',
            firstDayOfWeek,
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: First day of lessons is required,");
    })

    it('should have notification with class secondDayOfWeek is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let secondDayOfWeek;
        const c = new Class(
            '123',
            'bookName',
            'name',
            DateHelper.getDayOfweek(aValidDate),
            secondDayOfWeek,
            '08:00'
        )

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Second day of lessons is required,");
    })

    it('should have notification with class time is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let time;
        const c = new Class(
            '123',
            'bookName',
            'name',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            time
        )

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Time of lessons is required,");
    })

    it('should have six errors in notification', () => {
        let code;
        let bookName;
        let name;
        let firstDayOfWeek;
        let secondDayOfWeek;
        let time;
        const c = new Class(
            code,
            bookName,
            name,
            firstDayOfWeek,
            secondDayOfWeek,
            time
        )

        expect(c.notification).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(6)
        expect(c.notification?.messages()).toBe("class: classcode is required,class: Name of the book is required,class: Name of the class is required,class: First day of lessons is required,class: Second day of lessons is required,class: Time of lessons is required,")
    })

    it('should have at least one student', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
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


        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        c.setStudent(student);
        expect(c).toBeDefined()
        expect(c.getStudents().length).toBe(1)
        expect(c.notification?.getErrors().length).toBe(0)
    })

    it('should instantiate a class with a teacher', () => {
        const expectedBirthDay = new Date();
        const expectedName = 'edson';
        const expectedRole = RoleEnum.TEACHER;
        const teacher = new Worker(expectedBirthDay, expectedName, expectedRole);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        c.setTeacher(teacher);
        expect(c).toBeDefined()
        expect(c.getTeacher()).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(0)
    })

    it('should have a notification with one error firstDayOfWeek incorrect', () => {
        // date of the year: saturday august 10 2024
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(inValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        expect(c).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(1)
        expect(c.notification?.messages()).toBe("class: firstDayOfWeek must be a weekday,")
    })

    it('should have a notification with one error secondDayOfWeek incorrect', () => {
        // date of the year: saturday august 10 2024
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(inValidDate),
            '08:00'
        )
        expect(c).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(1)
        expect(c.notification?.messages()).toBe("class: secondDayOfWeek must be a weekday,")
    })

    it('should have a notification with one error firstDayOfWeek incorrect', () => {
        // date of the year: saturday august 10 2024
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(inValidDate),
            DateHelper.getDayOfweek(inValidDate),
            '08:00'
        )
        expect(c).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(2)
        expect(c.notification?.messages()).toBe("class: firstDayOfWeek must be a weekday,class: secondDayOfWeek must be a weekday,")
    });

    it('Should get class code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getClassCode()).toBe('123')
    });

    it('Should get name book code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getNameBook()).toBe('book')
    });

    it('Should get name code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getName()).toBe('A1')
    });

    it('Should get firstDayofweek code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getFirstDayOfClassInWeek()).toEqual('Friday')
    });

    it('Should get secondDayofweek code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getSecondDayOfClassInWeek()).toEqual('Friday')
    });

    it('Should get time code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(c.getTime()).toBe('08:00')
    });

    it('should have at least one student', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
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


        const c = new Class(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        let students : Student[] = [];
        students.push(student)
        c.setStudents(students);
        expect(c).toBeDefined()
        expect(c.getStudents().length).toBe(1)
        expect(c.notification?.getErrors().length).toBe(0)
    })

})