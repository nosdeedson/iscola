import { Class } from "../../../domain/class/class";
import { Schedule } from "../../../domain/schedule/schedule";
import { DateHelper } from "../../../helpers/date/date.helper";
import { ClassModel } from "./class.model";

describe('Classmodel unit tests', () => {

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

    it('should instantiate a ClassModel from a domain Class', () => {
        const model = ClassModel.toClassModel(c);
        expect(model).toBeDefined();
        expect(model.bookName).toEqual(c.getNameBook());
        expect(model.classCode).toEqual(c.getClassCode());
        expect(model.createdAt).toEqual(c.getCreatedAt());
        expect(model.deletedAt).toEqual(c.getDeletedAt());
        expect(model.id).toEqual(c.getId());
        expect(model.className).toEqual(c.getName());
        const firstDayOfWeek = c.getSchecule().getDayOfWeek()[0];
        const secondDayOfWeek = c.getSchecule().getDayOfWeek()[1];
        expect(model.firstDayOfClassInWeek).toEqual(firstDayOfWeek);
        expect(model.secondDayOfClassInWeek).toEqual(secondDayOfWeek);
        const firstTime = c.getSchecule().getTime(firstDayOfWeek)
        const secondTime = c.getSchecule().getTime(secondDayOfWeek)
        expect(model.timeFirstDay).toEqual(firstTime);
        expect(model.timeSecondDay).toEqual(secondTime);
        expect(model.updatedAt).toEqual(c.getUpdatedAt());
    })


    it('should return an array ClassModel from a domain Class array', () => {
        const model = ClassModel.toClassesModels([c])
        expect(model[0]).toBeDefined();
        expect(model[0].bookName).toEqual(c.getNameBook());
        expect(model[0].classCode).toEqual(c.getClassCode());
        expect(model[0].createdAt).toEqual(c.getCreatedAt());
        expect(model[0].deletedAt).toEqual(c.getDeletedAt());
        expect(model[0].id).toEqual(c.getId());
        expect(model[0].className).toEqual(c.getName());
        const firstDayOfWeek = c.getSchecule().getDayOfWeek()[0];
        const secondDayOfWeek = c.getSchecule().getDayOfWeek()[1];
        expect(model[0].firstDayOfClassInWeek).toEqual(firstDayOfWeek);
        expect(model[0].secondDayOfClassInWeek).toEqual(secondDayOfWeek);
        const firstTime = c.getSchecule().getTime(firstDayOfWeek)
        const secondTime = c.getSchecule().getTime(secondDayOfWeek)
        expect(model[0].timeFirstDay).toEqual(firstTime);
        expect(model[0].timeSecondDay).toEqual(secondTime);
        expect(model[0].updatedAt).toEqual(c.getUpdatedAt());
    })
})