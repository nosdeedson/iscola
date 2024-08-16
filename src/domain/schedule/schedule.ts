export class Schedule{
    private dayOfWeek: string[];
    private time: string[];

    constructor(
        dayOfWeek: string[],
        time: string[]
    ) {
        this.dayOfWeek = dayOfWeek;
        this.time = time;
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