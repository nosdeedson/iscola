import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { RepositoryInterface } from '../@shared/repository/repository.interface';


export interface StudentRepositoryInterface extends RepositoryInterface<StudentEntity> { }