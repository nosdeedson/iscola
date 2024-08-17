import { Entity } from "../@shared/entity";
import { ScheduleValidator } from "./schedule.validator";

export class Schedule extends Entity{
    private dayOfWeek: string[];
    private time: string[];

    constructor(
        dayOfWeek: string[],
        time: string[]
    ) {
        super();
        this.dayOfWeek = dayOfWeek;
        this.time = time;
        this.validate();
    }

    validate() {
        new ScheduleValidator().validate(this);
    }

    getDayOfWeek(): string[]{
        return this.dayOfWeek;
    }

    setDayOfWeek(dayOfWeek: string){
        this.dayOfWeek.push(dayOfWeek);
    }

    getTime(): string[]{
        return this.time;
    }

    setTime(time: string){
        this.time.push(time);
    }
}