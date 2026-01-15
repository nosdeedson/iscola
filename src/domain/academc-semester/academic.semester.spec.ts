import { AcademicSemester } from "./academic.semester"

describe('AcademicSemester unit tests', () =>{

    it('should instantiate a academicSemester without errors', () =>{
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0) 
        const academicSemester = new AcademicSemester(true, aValidBeginnig, aValidEnding);
        expect(academicSemester.getId()).toBeDefined()
        expect(academicSemester.getCreatedAt()).toBeDefined();
        expect(academicSemester.getUpdatedAt()).toBeDefined();
        expect(academicSemester.getDeletedAt()).toBeUndefined();
        expect(academicSemester.getActual()).toBeTruthy();
        expect(academicSemester.getBeginningDate()).toBeDefined();
        expect(academicSemester.getEndingDate()).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(0)

    })

    it('academicSemester notification should have one error', () =>{
        let actual;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const academicSemester = new AcademicSemester(actual as any, aValidBeginnig, aValidEnding);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(1);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: must inform academicSemester as actual,');
    })

    it('academicSemester notification should inform error beginning date', () =>{
        const actual = true;
        
        let aValidBeginnig;
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const academicSemester = new AcademicSemester(actual, aValidBeginnig as any, aValidEnding);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(1);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: academicSemester date beginning must be informed,');
    })

    it('academicSemester notification should inform error ending date', () =>{
        const actual = true;
        // first August 2024
        let aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        let aValidEnding;
        const academicSemester = new AcademicSemester(actual, aValidBeginnig, aValidEnding as any);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(1);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: academicSemester date ending must be informed,');
    })

    it('academicSemester notification should inform beginning date after ending date', () =>{
        const actual = true;
        // 3 february 2025
        let aValidBeginnig = new Date(2025, 1, 3, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const academicSemester = new AcademicSemester(actual, aValidBeginnig, aValidEnding);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(2);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: the beginning date must be before ending date,academicSemester: the ending date must be after beginning date,');
    })

    it('academicSemester notification should inform ending date before beginning date', () =>{
        let actual = true;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 28 june 2024
        const aValidEnding = new Date(2024, 5, 28, 0, 0, 0);
        const academicSemester = new AcademicSemester(actual, aValidBeginnig, aValidEnding);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(2);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: the beginning date must be before ending date,academicSemester: the ending date must be after beginning date,');
    })

    it('academicSemester notification should inform beginning date on weekend', () =>{
        let actual = true;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 3, 0, 0, 0);
        // 29 november 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const academicSemester = new AcademicSemester(actual, aValidBeginnig, aValidEnding);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(1);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: the academicSemester must start in a weekday,');
    })

    it('academicSemester notification should inform ending date on weekend', () =>{
        let actual = true;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 28 june 2024
        const aValidEnding = new Date(2024, 10, 30, 0, 0, 0);
        const academicSemester = new AcademicSemester(actual, aValidBeginnig, aValidEnding);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(1);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: the academicSemester must end in a weekday,');
    })

    it('academicSemester notification should inform 3 errors', () =>{
        let actual;
        let aValidBeginnig;
        let aValidEnding;
        const academicSemester = new AcademicSemester(actual as any, aValidBeginnig as any, aValidEnding as any);
        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(3);
        expect(academicSemester.notification?.messages()).toBe('academicSemester: must inform academicSemester as actual,academicSemester: academicSemester date beginning must be informed,academicSemester: academicSemester date ending must be informed,');
    });

    it('should have an error if beggning and end of the semester is equal', () =>{
        const inValidBeginnig = new Date(2024, 9, 30, 10, 59, 59);
        const inValidEnding = new Date(2024, 9, 30, 10, 59, 59); 
        const academicSemester = new AcademicSemester(true, inValidBeginnig, inValidEnding);

        expect(academicSemester).toBeDefined();
        expect(academicSemester.notification?.getErrors().length).toBe(1);
        expect(academicSemester.notification.messages()).toBe('academicSemester: the beggning and the end of the semester can not be equal,')

    })

})