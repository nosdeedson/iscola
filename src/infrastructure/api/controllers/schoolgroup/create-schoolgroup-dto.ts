import { ApiProperty } from "@nestjs/swagger";
import { CreateClassDto } from "src/aplication/services/class/create/create.class.dto";
import { ScheduleDto } from "src/aplication/services/class/create/schedule-dto";

export class Schedule  {

    @ApiProperty({description: 'Days of the week that the lessons will be teach.', examples:['Monday', 'Tuesday']})
    dayOfWeeks: string[];

    @ApiProperty({description: 'Hours of the lessons', examples: ['08:00', '09:00']})
    times: string[];

    toMap(times: string[], keys: string[]): Map<string, string>{
        let m = new Map();
        m.set(keys[0], times[0])
        m.set(keys[1], times[1])
        return m;
    }
}

export class CreateSchoolgroupDto {

    @ApiProperty({description: 'Name of the books that will be used in the lessons', example: 'A1'})
    nameBook: string;

    @ApiProperty({description: 'Name of the schoolgroup', example: 'A1-morning'})
    name: string;

    @ApiProperty()
    scheduleDto: Schedule;

    toInput(): CreateClassDto{
        let m = new Map();
        let key1 = this.scheduleDto.dayOfWeeks[0];
        let key2 = this.scheduleDto.dayOfWeeks[1]
        m.set(key1, this.scheduleDto.times[0])
        m.set(key2, this.scheduleDto.times[1])
        let scheduleDto = new ScheduleDto(this.scheduleDto.dayOfWeeks, m);
        return new CreateClassDto(
            this.nameBook,
            this.name,
            scheduleDto
        )
    }
}
