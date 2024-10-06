import { AcademicSemesterInterface } from "src/domain/academc-semester/academic.semester.repository.interface";
import { FindAcademicSemesterDto } from "./find.academic-semester.dto";
import { SystemError } from "src/usecases/@shared/system-error";

export class FindAcademicSemesterUseCase {

    private semesterRepository: AcademicSemesterInterface;

    constructor(semesterRepository: AcademicSemesterInterface){
        this.semesterRepository = semesterRepository;
    }

    async execute(id: string){
        try {
            let semester = await this.semesterRepository.find(id);
            return new FindAcademicSemesterDto(semester.actual, semester.beginningDate, semester.endingDate);
        } catch (error) {
            let notification = {context: 'academicSemester', message: 'Failed to find academic semester'};
            let err = new SystemError([notification]);
            throw err;
        }
    }
}