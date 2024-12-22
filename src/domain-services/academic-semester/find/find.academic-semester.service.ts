import { AcademicSemesterInterface } from "src/domain/academc-semester/academic.semester.repository.interface";
import { FindAcademicSemesterDto } from "./find.academic-semester.dto";
import { SystemError } from "src/domain-services/@shared/system-error";

export class FindAcademicSemesterService {

    private semesterRepository: AcademicSemesterInterface;

    constructor(semesterRepository: AcademicSemesterInterface){
        this.semesterRepository = semesterRepository;
    }

    async execute(id: string){
        try {
            let semester = await this.semesterRepository.find(id);
            if (!semester) {
                throw new SystemError([{context: 'academicSemester', message: 'Academic Semester not found'}]);
            }
            let dto = new FindAcademicSemesterDto(semester.id, semester.actual, semester.beginningDate, semester.endingDate);
            return dto;
        } catch (error) {
            throw error;
        }
    }
}