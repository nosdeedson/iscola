import { Period } from "./period"

describe('Period unit tests', () =>{

    it('should instantiate a period without errors', () =>{
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0) 
        const period = new Period(true, aValidBeginnig, aValidEnding);
        expect(period.getId()).toBeDefined()
        expect(period.getCreatedAt()).toBeDefined();
        expect(period.getUpdatedAt()).toBeDefined();
        expect(period.getDeletedAt()).toBeUndefined();
        expect(period.getActual()).toBeTruthy();
        expect(period.getBeginningDate()).toBeDefined();
        expect(period.getEndingDate()).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(0)

    })

    it('period notification should have one error', () =>{
        let actual;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(1);
        expect(period.notification?.messages()).toBe('period: must inform period as actual,');
    })

    it('period notification should inform error beginning date', () =>{
        const actual = true;
        
        let aValidBeginnig;
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(1);
        expect(period.notification?.messages()).toBe('period: period date beginning must be informed,');
    })

    it('period notification should inform error ending date', () =>{
        const actual = true;
        // first August 2024
        let aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        let aValidEnding;
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(1);
        expect(period.notification?.messages()).toBe('period: period date ending must be informed,');
    })

    it('period notification should inform beginning date after ending date', () =>{
        const actual = true;
        // 3 february 2025
        let aValidBeginnig = new Date(2025, 1, 3, 0, 0, 0);
        // 29 November 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(2);
        expect(period.notification?.messages()).toBe('period: the beginning date must be before ending date,period: the ending date must be after beginning date,');
    })

    it('period notification should inform ending date before beginning date', () =>{
        let actual = true;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 28 june 2024
        const aValidEnding = new Date(2024, 5, 28, 0, 0, 0);
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(2);
        expect(period.notification?.messages()).toBe('period: the beginning date must be before ending date,period: the ending date must be after beginning date,');
    })

    it('period notification should inform beginning date on weekend', () =>{
        let actual = true;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 3, 0, 0, 0);
        // 29 november 2024
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(1);
        expect(period.notification?.messages()).toBe('period: the period must start in a weekday,');
    })

    it('period notification should inform ending date on weekend', () =>{
        let actual = true;
        // first August 2024
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        // 28 june 2024
        const aValidEnding = new Date(2024, 10, 30, 0, 0, 0);
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(1);
        expect(period.notification?.messages()).toBe('period: the period must end in a weekday,');
    })

    it('period notification should inform 3 errors', () =>{
        let actual;
        let aValidBeginnig;
        let aValidEnding;
        const period = new Period(actual, aValidBeginnig, aValidEnding);
        expect(period).toBeDefined();
        expect(period.notification?.getErrors().length).toBe(3);
        expect(period.notification?.messages()).toBe('period: must inform period as actual,period: period date beginning must be informed,period: period date ending must be informed,');
    })

})