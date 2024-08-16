import { DateHelper } from "../../helpers/date/date.helper"
import { Parent } from "../parent/parent";
import { Schedule } from "../schedule/schedule";
import { Student } from "../student/student";
import { RoleEnum } from "../worker/roleEnum";
import { Worker } from "../worker/worker";
import { Class } from "./class"


describe('Class tests units', () => {

    let schedule: Schedule;
    let aValidDate: Date;
    let aValidDate2: Date;
    let c;

    beforeEach(() =>{
        // date of the year: august 9 2024
        aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);
        schedule = new Schedule(
            [DateHelper.getDayOfweek(aValidDate), DateHelper.getDayOfweek(aValidDate2)],
            ['08:00', '08:00']
        )

        c = new Class(
            '123',
            'book',
            'A1',
            schedule,
            '08:00'
        )
    })

    it('Verify validate is called', () => {
        const classFile = jest.spyOn(Class.prototype, 'validate')
            .mockImplementationOnce(() => {
                console.log('mocked')
            })
        c.validate()

        expect(classFile).toHaveBeenCalled();
    });

    it('Should instantiate a class', () => {
        
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
        let cCode;
        c.setClassCode(cCode);
        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: classcode is required,");
    })

    it('should have notification with class book is empty ', () => {
        let bookName;
        c.setNameBook(bookName)

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Name of the book is required,");
    })

    it('should have notification with class name is empty ', () => {
        let name;
        c.setName(name)
        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Name of the class is required,");
    })

    it('should have notification if class do not have a schedule', () => {
        c.setSchecule(null);

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: Schedule of the class is required,");
    })

    it('should have notification if class has schedule with one day', () => {
        aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let s = new Schedule(
            [DateHelper.getDayOfweek(aValidDate), ],
            ['08:00', '08:00']
        )
        c.setSchecule(s)
        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: schedule must constains two days,");
    })

    it('should have notification if class has just one time', () => {
        aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);
        let s = new Schedule(
            [DateHelper.getDayOfweek(aValidDate), DateHelper.getDayOfweek(aValidDate2)],
            ['08:00']
        )
        c.setSchecule(s)

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: schedule must constains two times,");
    })

    it('should have six errors in notification', () => {
        let code;
        let bookName;
        let name;
        let schedule;
        const c = new Class(
            code,
            bookName,
            name,
            schedule
        )

        expect(c.notification).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(4)
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

        const schedule = new Schedule(
            [
                DateHelper.getDayOfweek(inValidDate), 
                DateHelper.getDayOfweek(aValidDate) 
            ],
            ['08:00', '08:00']
        )

        c.setSchecule(schedule);
        expect(c).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(1)
        expect(c.notification?.messages()).toBe("class: schedule must be a weekday,")
    })

    it('should have a notification with one error time incorrect', () => {
        // date of the year: saturday august 10 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const schedule = new Schedule(
            [
                DateHelper.getDayOfweek(aValidDate), 
                DateHelper.getDayOfweek(aValidDate) 
            ],
            ['08:00', '08:00']
        )
        c.setSchecule()
        expect(c).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(1)
        expect(c.notification?.messages()).toBe("class: Schedule of the class is required,")
    })


    it('Should get class code ', () => {
        expect(c.getClassCode()).toBe('123')
    });

    it('Should get name book code ', () => {
        expect(c.getNameBook()).toBe('book')
    });

    it('Should get name code ', () => {
        expect(c.getName()).toBe('A1')
    });

    it('Should get firstDayofweek code ', () => {
        expect(c.getSchecule()[0].getDayOfWeek()).toEqual('Friday')
    });

    it('Should get secondDayofweek', () => {
        expect(c.getSchecule()[1]).toEqual('Thursday')
    });

    it('Should get time', () => {
        expect(c.getSchecule()[0].getTime()).toBe('08:00')
    });

    it('should have at least one student', () => {
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
        let students : Student[] = [];
        students.push(student)
        c.setStudents(students);
        expect(c).toBeDefined()
        expect(c.getStudents().length).toBe(1)
        expect(c.notification?.getErrors().length).toBe(0)
    })

})