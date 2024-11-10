import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { PeronRepositoryInterface } from '../@shared/repository/person.repository.interface';


export interface StudentRepositoryInterface extends PeronRepositoryInterface<StudentEntity> {
    findStudentsByIds(studentsIds: string): Promise<StudentEntity[]>;
 }