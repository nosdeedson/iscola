import { AcademicSemesterEntity } from "src/infrastructure/entities/academic-semester/academic.semester.entity";
import { FindAcademicSemesterDto } from "../find/find.academic-semester.dto";

export class FindAllAcademicSemesterDto {
    all: FindAcademicSemesterDto[] = [];
    
    constructor(entities: AcademicSemesterEntity[]){
        entities.map(it => {
            let semester = new FindAcademicSemesterDto(it.id, it.actual, it.beginningDate, it.endingDate)
            this.all.push(semester)
        })
    }
}