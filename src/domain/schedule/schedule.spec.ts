import { DateHelper } from "../../helpers/date/date.helper";
import { Schedule } from "./schedule";

describe("Schedule unit tests", () =>{

    it('should instantiate a schedule', () =>{
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let aValidDate2 = new Date(2024, 7, 8, 17, 5, 0, 0);
        let schedule = new Schedule(
            [DateHelper.getDayOfweek(aValidDate), DateHelper.getDayOfweek(aValidDate2)],
            ['08:00', '08:00']
        )
        expect(schedule).toBeDefined();
        expect(schedule.getDayOfWeek()[0]).toBe('Friday');
        expect(schedule.getDayOfWeek()[1]).toBe('Thursday');
        expect(schedule.getTime()[0]).toBe('08:00');
        expect(schedule.getTime()[1]).toBe('08:00');
        expect(schedule.getDayOfWeek().length).toBe(2)
        expect(schedule.getTime().length).toBe(2)
    })

    it('should have notification with errors', () => {
        // date of the year: august 9 2024 Friday
        let aValidDate = new Date(2024, 7, 9, 17, 5, 0, 0);
        let schedule = new Schedule(
            [DateHelper.getDayOfweek(aValidDate)],
            ['08:00']
        );
        expect(schedule).toBeDefined();
        expect(schedule.getNotification().hasError()).toBeTruthy()
        expect(schedule.getNotification().messages()).toBe("schedule: dayOfWeek field must have at least 2 items,schedule: time field must have at least 2 items,")
    })
})