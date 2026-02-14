import { AcademicSemester } from 'src/domain/academc-semester/academic.semester';
import { AcademicSemesterInterface } from '../../../../domain/academc-semester/academic.semester.repository.interface';
import { InputCreateAcademicSemesterDto } from './academic-semester.dto';
import { AcademicSemesterEntity } from 'src/infrastructure/entities/academic-semester/academic.semester.entity';
import { SystemError } from 'src/application/services/@shared/system-error';


export class CreateAcademicSemesterService {
    private semesterRepository: AcademicSemesterInterface;

    constructor(semesterRespository: AcademicSemesterInterface){
        this.semesterRepository = semesterRespository;
    }

    public async execute(input: InputCreateAcademicSemesterDto): Promise<void>{
        try {
            let semester = new AcademicSemester(true, input.beginningDate, input.endingDate);
            if(semester.notification?.hasError()){
                let errors = semester.notification?.getErrors();
                throw new SystemError(errors);
            }
            let model = AcademicSemesterEntity.toAcademicSemester(semester);
            await this.semesterRepository.create(model);
        } catch (error) {
            throw error;
        }
    }

}