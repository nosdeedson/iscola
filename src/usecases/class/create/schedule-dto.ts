export class ScheduleDto{

    dayOfWeeks: string[];
    times: Map<string, string>
     
    constructor(
        dayOfWeeks: string[],
        times: Map<string, string>    
    ){
        this.dayOfWeeks = dayOfWeeks;
        this.times = times;
    }
}