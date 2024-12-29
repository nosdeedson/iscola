import { StudentRepositoryInterface } from "src/domain/student/student.repository.interface";
import { FindStutendDto } from "./find.student.dto";
import { SystemError } from "src/domain-services/@shared/system-error";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";

export class FindStudentService {

    private studentRepository: StudentRepositoryInterface;

    constructor(studentRepository: StudentRepositoryInterface){
        this.studentRepository = studentRepository;
    }

    async execute(id: string):Promise<FindStutendDto>{
        const student = await this.studentRepository.find(id) as StudentEntity;
        if(!student){
            throw new SystemError([{context: 'student', message: 'student not found'}]);
        }
        let result = new FindStutendDto(student);
        return result
    }

}