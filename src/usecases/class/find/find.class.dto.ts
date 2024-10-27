import { ClassEntity } from "src/infrastructure/entities/class/class.entity";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";
import { WorkerEntity } from "src/infrastructure/entities/worker/worker.entity";

export class FindClassDto {

    id: string;
    classCode: string;
    nameBook: string;
    name: string;
    schedule: ClassScheduleDto;
    teacher: ClassTeacherDto;
    students: ClassStudentDto[];

    static toDto(entity: ClassEntity): FindClassDto {
        let dto = new FindClassDto();
        dto.id = entity.id;
        dto.classCode = entity.classCode;
        dto.name = entity.className;
        dto.nameBook = entity.bookName;
        dto.schedule = ClassScheduleDto.toDto(entity);
        dto.students = ClassStudentDto.toDto(entity.students);
        dto.teacher = ClassTeacherDto.toDto(entity.teacher);
        return dto;
    }
}

export class ClassStudentDto {
    id: string;
    name: string;

    static toDto(entities: StudentEntity[]): ClassStudentDto[]{
        let dtos : ClassStudentDto[] = [];
        if(entities){
            entities.forEach(it =>{
                let dto = new ClassStudentDto();
                dto.id = it.id;
                dto.name = it.fullName;
                dtos.push(dto);
            });
        }
        return dtos;
    }
}

export class ClassTeacherDto {
    id: string;
    name: string;

    static toDto(teacher: WorkerEntity): ClassTeacherDto{
        let dto = new ClassTeacherDto();
        if(teacher){
            dto.id = teacher.id;
            dto.name = teacher.fullName;
        };
        return dto;
    }
}

export class  ClassScheduleDto {

    dayOfWeeks: string[] = [];
    times: Map<string, string> = new Map<string, string>();

    static toDto(entity: ClassEntity): ClassScheduleDto {
        let dto = new ClassScheduleDto();
        dto.dayOfWeeks.push(entity.firstDayOfClassInWeek);
        dto.dayOfWeeks.push(entity.secondDayOfClassInWeek);
        dto.times.set(entity.firstDayOfClassInWeek, entity.timeFirstDay);
        dto.times.set(entity.secondDayOfClassInWeek, entity.timeSecondDay);
        return dto;
    }
}