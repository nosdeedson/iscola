import { StudentRepositoryInterface } from "src/domain/student/student.repository.interface";

export class DeleteStudentService {

    private studentRepository: StudentRepositoryInterface;

    constructor(studentRepository: StudentRepositoryInterface){
        this.studentRepository = studentRepository;
    }

    async execute(id: string): Promise<void>{
        try {
            this.studentRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

}