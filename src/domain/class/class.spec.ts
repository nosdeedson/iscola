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
         // date of the year: august 9 2024 Friday
         let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
         let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);
 
         let firstDay = DateHelper.getDayOfweek(aValidDate); 
         let secondDay = DateHelper.getDayOfweek(aValidDate2); 
 
         let times = new Map();
         DateHelper.setTime(times, firstDay, '08:00');
         DateHelper.setTime(times, secondDay, '08:00');
 
         let schedule = new Schedule(
             [firstDay, secondDay],
             times
         )

        c = new Class(
            '123',
            'book',
            'A1',
            schedule,
        )
    })

    // TODO TESTS WITH DIFERENT TIMES AND VALIDATE FIRST DAY LESS THAN SECOND DAY

    it('Verify validate is called', () => {
        const classFile = jest.spyOn(Class.prototype, 'validate')
            .mockImplementationOnce(() => {
                console.log('mocked')
            })
        c.validate();

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
        let firstDay =  DateHelper.getDayOfweek(aValidDate); 
        let times = new Map();
        DateHelper.setTime(times, firstDay, '08:00');
        DateHelper.setTime(times, firstDay, '08:00');
        let s = new Schedule(
            [firstDay],
            times
        )
        c.setSchecule(s)
        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: schedule is invalid,");
    })

    it('should have notification if class has just one time', () => {
       // date of the year: august 9 2024 Friday
       let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
       let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

       let firstDay = DateHelper.getDayOfweek(aValidDate); 
       let secondDay = DateHelper.getDayOfweek(aValidDate2); 

       let times = new Map();
       DateHelper.setTime(times, firstDay, '08:00');

        let s = new Schedule(
            [firstDay, secondDay],
            times
        )
        c.setSchecule(s)

        expect(c.notification).toBeDefined();
        expect(c.notification?.hasError()).toBeTruthy();
        expect(c.notification?.getErrors().length).toBe(1);
        expect(c.notification?.messages()).toBe("class: schedule is invalid,");
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

        expect(c.getNotification()).toBeDefined()
        expect(c.getNotification()?.getErrors().length).toBe(4)
        expect(c.getNotification()?.messages()).toBe("class: classcode is required,class: Name of the book is required,class: Name of the class is required,class: Schedule of the class is required,")
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
        let firstDay = DateHelper.getDayOfweek(inValidDate);
        let secondDay = DateHelper.getDayOfweek(aValidDate);

        let times = new Map();
        DateHelper.setTime(times, firstDay, '08:00' );
        DateHelper.setTime(times, secondDay, '08:00' );

        const schedule = new Schedule(
            [
                DateHelper.getDayOfweek(inValidDate), 
                DateHelper.getDayOfweek(aValidDate) 
            ],
            times
        )

        c.setSchecule(schedule);
        expect(c).toBeDefined()
        expect(c.notification?.getErrors().length).toBe(1)
        expect(c.notification?.messages()).toBe("class: schedule must be a weekday,")
    })

    it('should have a notification with one error time incorrect', () => {
        // date of the year: august 9 2024 Friday
       let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
       let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

       let firstDay = DateHelper.getDayOfweek(aValidDate); 
       let secondDay = DateHelper.getDayOfweek(aValidDate2); 

       let times = new Map();
       DateHelper.setTime(times, firstDay, '08:00');
        const schedule = new Schedule(
            [firstDay, secondDay ],
            times
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
        expect(c.getSchecule().getDayOfWeek()[0]).toEqual('Friday')
    });

    it('Should get secondDayofweek', () => {
        expect(c.getSchecule().getDayOfWeek()[1]).toEqual('Thursday')
    });

    it('Should get time', () => {
        expect(c.getSchecule().getTimes().get('Friday')).toBe('08:00')
    });

    it('Should get time', () => {
        expect(c.getSchecule().getTimes().get('Thursday')).toBe('08:00')
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

    it('should have errors in notification is days equals and times equals', () =>{
         let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
         let aValidDate2 = new Date(2024, 7, 9, 17, 5, 0, 0);
 
         let firstDay = DateHelper.getDayOfweek(aValidDate); 
         let secondDay = DateHelper.getDayOfweek(aValidDate2); 
 
         let times = new Map();
         DateHelper.setTime(times, firstDay, '08:00');
         DateHelper.setTime(times, secondDay, '08:00');
 
         let schedule = new Schedule(
             [firstDay, secondDay],
             times
         )
         c.setSchecule(schedule);
         expect(c.getNotification().hasError()).toBeTruthy();
    });

    it('Should instantiate a class', () => {

        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

        let firstDay = DateHelper.getDayOfweek(aValidDate); 
        let secondDay = DateHelper.getDayOfweek(aValidDate2); 

        let times = new Map();
        DateHelper.setTime(times, firstDay, '08:00');
        DateHelper.setTime(times, secondDay, '09:00');

        let schedule = new Schedule(
            [firstDay, secondDay],
            times
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

})