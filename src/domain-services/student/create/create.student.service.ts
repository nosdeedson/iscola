import { SystemError } from "src/domain-services/@shared/system-error";
import { NotificationErrorProps } from "src/domain/@shared/notification/notification";
import { ClassRepositoryInterface } from "src/domain/class/class.repository.interface";
import { Parent } from "src/domain/parent/parent";
import { ParentReporitoryInterface } from "src/domain/parent/parent.repository.interface";
import { Student } from "src/domain/student/student";
import { StudentRepositoryInterface } from "src/domain/student/student.repository.interface";
import { StudentEntity } from "src/infrastructure/entities/student/student.entity";
import { CreateStudentDto } from "./create.student.dto";

export class CreateStudentService {

    private studentRepository: StudentRepositoryInterface;
    private schoolgroupRepository: ClassRepositoryInterface;
    private parentRepository: ParentReporitoryInterface

    constructor(
        studentRepository: StudentRepositoryInterface,
        schoolgroupRepository: ClassRepositoryInterface,
        parentRepository: ParentReporitoryInterface
    ) {
        this.studentRepository = studentRepository;
        this.schoolgroupRepository = schoolgroupRepository;
        this.parentRepository = parentRepository;
    }

    async execute(dto: CreateStudentDto) {
        try {
            let errors: NotificationErrorProps[] = [];
            const schoolGroup = await this.schoolgroupRepository.findByClassCode(dto.enrolled);
            if (!schoolGroup) {
                errors.push({ context: 'student', message: 'Schoolgroup not found' });
            }
            const parents = await this.parentRepository.findByIds(dto.parentsId);
            if (parents.length == 0) {
                errors.push({ context: 'student', message: 'At least one parent must be informed' });
            }

            if (errors.length > 0) {
                throw new SystemError(errors);
            }
            let parentsDomain: Parent[] = [];
            parents.map(it => {
                let parent = Parent.toDomain(it);
                parentsDomain.push(parent)
            });
            let student = new Student(dto.birthday, dto.name, dto.enrolled, parentsDomain);
            if(student?.getNotification()?.hasError()){
                throw new SystemError(student.getNotification().errors);
            }
            let studentEntity = StudentEntity.toStudentEntity(student);
            await this.studentRepository.create(studentEntity);
        } catch (error) {
            throw error;
        }
    }


}