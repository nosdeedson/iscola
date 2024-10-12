import { AcademicSemesterRepository } from "src/infrastructure/repositories/academic-semester/academic-semester.repository";
import { UpdateAcademicSemesterDto } from "./udpate.academic-semester.dto";

export class UpdateAcademicSemesterUseCase{

    private semesterRepository: AcademicSemesterRepository;

    constructor(semesterRepository: AcademicSemesterRepository){
        this.semesterRepository = semesterRepository;
    }

    async execute(dto: UpdateAcademicSemesterDto) {
        try {
            let entity = await this.semesterRepository.find(dto.id);
            if(entity){
                entity.actual = dto.actual;
                //entity.deletedAt = new Date();
                await this.semesterRepository.update(entity);
            }
        } catch (error) {
            throw error;
        }
    }

}