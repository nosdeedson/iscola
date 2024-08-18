
export class DateHelper {

    static getDayOfweek(date: Date): string{
        switch(date.getDay()){
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            default: return 'Saturday';
        }
    }

    /**
     * 
     * @param times Map
     * @param key a weekday
     * @param hours string representing an hour xx:xx
     * @returns 
     */
    static setTime(times: Map<string, string>, key: string, hours: string): Map<string, string>{
        if(this.isAWeekday(key)){
            times.set(key, hours);
        }else{
            times = null;
        }
        return times
    }

    static isAWeekday(day: string): boolean{
        let weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekDay.includes(day);
    }
}