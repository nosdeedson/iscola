import { Inject, Injectable } from '@nestjs/common';
import { RepositoryInterface } from 'src/domain/@shared/repository/repository.interface';
import { AcademicSemesterEntity } from 'src/infrastructure/entities/academic-semester/academic.semester.entity';
import { AcademicSemesterRepository } from 'src/infrastructure/repositories/academic-semester/academic-semester.repository';
import { DataSource } from 'typeorm';
import { TypeRepository } from './type-repository';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';
import { ClassEntity } from 'src/infrastructure/entities/class/class.entity';
import { StudentRepository } from 'src/infrastructure/repositories/student/student.repository';
import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { CommentRepository } from 'src/infrastructure/repositories/comment/comment.respository';
import { CommentEntity } from 'src/infrastructure/entities/comment/comment.entity';
import { ParentRepository } from 'src/infrastructure/repositories/parent/parent.repository';
import { ParentEntity } from 'src/infrastructure/entities/parent/parent.entity';
import { RatingEntity } from 'src/infrastructure/entities/rating/rating.entity';
import { RatingRepositiry } from 'src/infrastructure/repositories/rating/rating.repository';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserEntity } from 'src/infrastructure/entities/user/user.entity';
import { WorkerRepository } from 'src/infrastructure/repositories/worker/worker.repository';
import { WorkerEntity } from 'src/infrastructure/entities/worker/worker.entity';
import { SystemError } from 'src/application/services/@shared/system-error';
import { ParentStudentRepository } from 'src/infrastructure/repositories/parent-student/parent.student.repositoy';
import { ParentStudentEntity } from 'src/infrastructure/entities/parent-student/parent.student.entity';

@Injectable()
export class RepositoryFactoryService {

    constructor(@Inject("DATA_SOURCE") private readonly dataSource: DataSource) { }

    public createRepository(whichRepository: TypeRepository): any{
        switch (whichRepository) {
            case TypeRepository.ACADEMIC_SEMESTER:
                return new AcademicSemesterRepository(this.dataSource.getRepository(AcademicSemesterEntity), this.dataSource);
            case TypeRepository.CLASS:
                return new ClassRepository(this.dataSource.getRepository(ClassEntity), this.dataSource) as ClassRepository;
            case TypeRepository.COMMENT:
                return new CommentRepository(this.dataSource.getRepository(CommentEntity), this.dataSource);
            case TypeRepository.PARENT:
                return new ParentRepository(this.dataSource.getRepository(ParentEntity), this.dataSource);
            case TypeRepository.PARENT_STUDENT:
                return new ParentStudentRepository(this.dataSource.getRepository(ParentStudentEntity));
            case TypeRepository.RATING:
                return new RatingRepositiry(this.dataSource.getRepository(RatingEntity), this.dataSource);
            case TypeRepository.STUDENT:
                return new StudentRepository(this.dataSource.getRepository(StudentEntity), this.dataSource);
            case TypeRepository.USER:
                return new UserRepository(this.dataSource.getRepository(UserEntity), this.dataSource);
                case TypeRepository.WORKER:
                return new WorkerRepository(this.dataSource.getRepository(WorkerEntity), this.dataSource);
            default:
                throw new SystemError([{context: 'RepositoryFactory', message: "Erro while creating repository."}])
        }
    }
}
