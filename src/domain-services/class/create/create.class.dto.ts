import { ScheduleDto } from "./schedule-dto";

export class CreateClassDto{
    
    classCode?: string;
    nameBook: string;
    name: string;
    scheduleDto: ScheduleDto;

    constructor(
        nameBook: string,
        name: string,
        scheduleDto: ScheduleDto,
        classCode?: string
    ){
        this.classCode = classCode;
        this.nameBook = nameBook;
        this.name = name;
        this.scheduleDto = scheduleDto as ScheduleDto;
    }
}