import { AcademicSemesterEntity } from "src/infrastructure/entities/academic-semester/academic.semester.entity";
import { ClassEntity } from "src/infrastructure/entities/class/class.entity";

export class TeacherClassRatingDto {
    teacherId: string;
    students: StudentInfoDto[] = [];
    classId: string;
    className: string;
    bookName: string;
    daysOfClass: ClassInfoDto[] = [];
    semester: SemesterInfoDto;

    constructor(classEntity: ClassEntity, semester: AcademicSemesterEntity){
        if(!classEntity || !semester){
            return this;
        }
        classEntity.students.forEach(it => {
            const studentInfo = new StudentInfoDto(it.fullName, it.id);
            this.students.push(studentInfo);
        });
        this.teacherId = classEntity.teacher.id;
        this.classId = classEntity.id;
        this.className = classEntity.className;
        this.bookName = classEntity.bookName;
        const firstDay = new ClassInfoDto(classEntity.firstDayOfClassInWeek, classEntity.timeFirstDay);
        this.daysOfClass.push(firstDay);
        const secondDay = new ClassInfoDto(classEntity.secondDayOfClassInWeek, classEntity.timeSecondDay);
        this.daysOfClass.push(secondDay);
        this.semester = new SemesterInfoDto(semester);
    }

}

class StudentInfoDto{
    name: string;
    idStudent: string;
    constructor(name: string, idStudent: string){
        this.name = name;
        this.idStudent = idStudent;
    }
}

class ClassInfoDto{
    dayOfClass: string;
    timeOfClass: string;
    constructor(dayOfClass: string, timeOfClass: string){
        this.dayOfClass = dayOfClass;
        this.timeOfClass = timeOfClass;
    }
}

class SemesterInfoDto{
    beginnigDate: Date;
    endingDate: Date;
    actual: boolean;
    constructor(semester: AcademicSemesterEntity){
        this.beginnigDate = semester?.beginningDate;
        this.endingDate = semester?.endingDate;
        this.actual = semester?.actual;
    }
}