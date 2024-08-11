import { DateHelper } from "../../helpers/date/date.helper"
import { Parent } from "../parent/parent";
import { Student } from "../student/student";
import { RoleEnum } from "../worker/roleEnum";
import { Worker } from "../worker/worker";
import { Classroom } from "./classroom"


describe('Classroom tests units', () => {


    it('Verify validate is called', () => {
        const classroomFile = jest.spyOn(Classroom.prototype, 'validate')
            .mockImplementationOnce(() => {
                console.log('mocked')
            })
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        classroom.validate()

        expect(classroomFile).toHaveBeenCalled();
    });


    it('Should instantiate a classroom', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

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
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let classroomCode;
        const classroom = new Classroom(
            classroomCode,
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Classroom code is required,");

    })

    it('should have notification with classroom book is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let bookName;
        const classroom = new Classroom(
            '123',
            bookName,
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Name of the book is required,");
    })

    it('should have notification with classroom name is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let name;
        const classroom = new Classroom(
            '123',
            'bookName',
            name,
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Name of the class is required,");
    })

    it('should have notification with classroom firstDayOfWeek is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let firstDayOfWeek;
        const classroom = new Classroom(
            '123',
            'bookName',
            'name',
            firstDayOfWeek,
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: First day of lessons is required,");
    })

    it('should have notification with classroom secondDayOfWeek is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let secondDayOfWeek;
        const classroom = new Classroom(
            '123',
            'bookName',
            'name',
            DateHelper.getDayOfweek(aValidDate),
            secondDayOfWeek,
            '08:00'
        )

        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Second day of lessons is required,");
    })

    it('should have notification with classroom time is empty ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let time;
        const classroom = new Classroom(
            '123',
            'bookName',
            'name',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            time
        )

        expect(classroom.notification).toBeDefined();
        expect(classroom.notification?.hasError()).toBeTruthy();
        expect(classroom.notification?.getErrors().length).toBe(1);
        expect(classroom.notification?.messages()).toBe("classroom: Time of lessons is required,");
    })

    it('should have six errors in notification', () => {
        let code;
        let bookName;
        let name;
        let firstDayOfWeek;
        let secondDayOfWeek;
        let time;
        const classroom = new Classroom(
            code,
            bookName,
            name,
            firstDayOfWeek,
            secondDayOfWeek,
            time
        )

        expect(classroom.notification).toBeDefined()
        expect(classroom.notification?.getErrors().length).toBe(6)
        expect(classroom.notification?.messages()).toBe("classroom: Classroom code is required,classroom: Name of the book is required,classroom: Name of the class is required,classroom: First day of lessons is required,classroom: Second day of lessons is required,classroom: Time of lessons is required,")
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


        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        classroom.setStudent(student);
        expect(classroom).toBeDefined()
        expect(classroom.getStudents().length).toBe(1)
        expect(classroom.notification?.getErrors().length).toBe(0)
    })

    it('should instantiate a classroom with a teacher', () => {
        const expectedBirthDay = new Date();
        const expectedName = 'edson';
        const expectedRole = RoleEnum.TEACHER;
        const teacher = new Worker(expectedBirthDay, expectedName, expectedRole);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        classroom.setTeacher(teacher);
        expect(classroom).toBeDefined()
        expect(classroom.getTeacher()).toBeDefined()
        expect(classroom.notification?.getErrors().length).toBe(0)
    })

    it('should have a notification with one error firstDayOfWeek incorrect', () => {
        // date of the year: saturday august 10 2024
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(inValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        expect(classroom).toBeDefined()
        expect(classroom.notification?.getErrors().length).toBe(1)
        expect(classroom.notification?.messages()).toBe("classroom: firstDayOfWeek must be a weekday,")
    })

    it('should have a notification with one error secondDayOfWeek incorrect', () => {
        // date of the year: saturday august 10 2024
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(inValidDate),
            '08:00'
        )
        expect(classroom).toBeDefined()
        expect(classroom.notification?.getErrors().length).toBe(1)
        expect(classroom.notification?.messages()).toBe("classroom: secondDayOfWeek must be a weekday,")
    })

    it('should have a notification with one error firstDayOfWeek incorrect', () => {
        // date of the year: saturday august 10 2024
        const inValidDate = new Date(2024, 7, 10, 17, 5, 0, 0);
        // date of the year: firday august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);

        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(inValidDate),
            DateHelper.getDayOfweek(inValidDate),
            '08:00'
        )
        expect(classroom).toBeDefined()
        expect(classroom.notification?.getErrors().length).toBe(2)
        expect(classroom.notification?.messages()).toBe("classroom: firstDayOfWeek must be a weekday,classroom: secondDayOfWeek must be a weekday,")
    });

    it('Should get classroom code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.getClassroomCode()).toBe('123')
    });

    it('Should get name book code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.getNameBook()).toBe('book')
    });

    it('Should get name code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.getName()).toBe('A1')
    });

    it('Should get firstDayofweek code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.getFirstDayOfWeek()).toEqual('Friday')
    });

    it('Should get secondDayofweek code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.getSecondDayOfWeek()).toEqual('Friday')
    });

    it('Should get time code ', () => {
        // date of the year: august 9 2024
        const aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )

        expect(classroom.getTime()).toBe('08:00')
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


        const classroom = new Classroom(
            '123',
            'book',
            'A1',
            DateHelper.getDayOfweek(aValidDate),
            DateHelper.getDayOfweek(aValidDate),
            '08:00'
        )
        let students : Student[] = [];
        students.push(student)
        classroom.setStudents(students);
        expect(classroom).toBeDefined()
        expect(classroom.getStudents().length).toBe(1)
        expect(classroom.notification?.getErrors().length).toBe(0)
    })

})