import { DateHelper } from "../../helpers/date/date.helper";
import { Schedule } from "./schedule";

describe("Schedule unit tests", () =>{

    it('should instantiate a schedule', () =>{
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
        expect(schedule).toBeDefined();
        expect(schedule.getDayOfWeek()[0]).toBe('Friday');
        expect(schedule.getDayOfWeek()[1]).toBe('Thursday');
        expect(schedule.getTimes().get(firstDay)).toBe(times.get(firstDay));
        expect(schedule.getTimes().get(secondDay)).toBe(times.get(secondDay));
        expect(schedule.getDayOfWeek().length).toBe(2)
        expect(schedule.getTimes().size).toBe(2)
    })

    it('should have notification with errors', () => {
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let firstDay = DateHelper.getDayOfweek(aValidDate); 

        let times = new Map();

        DateHelper.setTime(times, firstDay, '08:00');
        let schedule = new Schedule(
            [firstDay],
            times
        );
        expect(schedule).toBeDefined();
        expect(schedule.getNotification().hasError()).toBeTruthy()
        expect(schedule.getNotification().messages()).toBe("schedule: must inform two days for the lessons,schedule: inform twos times for the lessons,")
    })

    it('should have notification inform times less than 2', () =>{
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

        let firstDay = DateHelper.getDayOfweek(aValidDate); 
        let secondDay = DateHelper.getDayOfweek(aValidDate2); 

        let times = new Map();

        DateHelper.setTime(times, firstDay, '08:00');

        let schedule = new Schedule(
            [firstDay, secondDay],
            times
        )
        expect(schedule).toBeDefined();
        expect(schedule.getNotification().hasError()).toBeTruthy()
        expect(schedule.getNotification().messages()).toBe("schedule: inform twos times for the lessons,")
        
    })

    it('should have notification inform times less than 2', () =>{
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

        let firstDay = DateHelper.getDayOfweek(aValidDate); 
        let secondDay = DateHelper.getDayOfweek(aValidDate2); 

        let times = new Map();

        let schedule = new Schedule(
            [firstDay, secondDay],
            times
        )
        expect(schedule).toBeDefined();
        expect(schedule.getNotification().hasError()).toBeTruthy()
        expect(schedule.getNotification().messages()).toBe("schedule: inform twos times for the lessons,")
        
    })

    it('should have notification inform days less than 2', () =>{
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

        let firstDay = DateHelper.getDayOfweek(aValidDate); 
        let secondDay = DateHelper.getDayOfweek(aValidDate2); 

        let times = new Map();
        DateHelper.setTime(times, firstDay, '08:00');
        DateHelper.setTime(times, secondDay, '08:00');

        let schedule = new Schedule(
            [],
            times
        )
        expect(schedule).toBeDefined();
        expect(schedule.getNotification().hasError()).toBeTruthy()
        expect(schedule.getNotification().messages()).toBe("schedule: must inform two days for the lessons,")
        
    })


    it('should have notification inform days less than 2', () =>{
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);

        let firstDay = DateHelper.getDayOfweek(aValidDate); 
        let secondDay = DateHelper.getDayOfweek(aValidDate2); 

        let times = new Map();
        DateHelper.setTime(times, firstDay, '08:00');
        DateHelper.setTime(times, secondDay, '08:00');

        let schedule = new Schedule(
            [firstDay],
            times
        )
        expect(schedule).toBeDefined();
        expect(schedule.getNotification().hasError()).toBeTruthy()
        expect(schedule.getNotification().messages()).toBe("schedule: must inform two days for the lessons,")
        
    })

})