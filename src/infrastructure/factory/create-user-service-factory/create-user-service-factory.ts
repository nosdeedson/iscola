import { Inject, Injectable } from '@nestjs/common';
import { CreateGenericService } from 'src/domain-services/@shared/create-generic-service';
import { CreateParentService } from 'src/domain-services/parent/create/create.parent.service';
import { CreateStudentService } from 'src/domain-services/student/create/create.student.service';
import { CreateWorkerService } from 'src/domain-services/worker/create/create.worker.service';
import { AccessType } from 'src/domain/user/access.type';
import { ClassEntity } from 'src/infrastructure/entities/class/class.entity';
import { ParentEntity } from 'src/infrastructure/entities/parent/parent.entity';
import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { WorkerEntity } from 'src/infrastructure/entities/worker/worker.entity';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';
import { ParentRepository } from 'src/infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from 'src/infrastructure/repositories/student/student.repository';
import { WorkerRepository } from 'src/infrastructure/repositories/worker/worker.repository';
import { DataSource, In } from 'typeorm';

@Injectable()
export class CreateUserServiceFactory {

    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) { }

    public createUserService(accessType: AccessType): CreateGenericService {
        switch (accessType) {
            case AccessType.PARENT:
                const parentRepository = this.createParentRepository();
                return new CreateParentService(parentRepository);
            case AccessType.STUDENT:
                const studentEntity = this.dataSource.getRepository(StudentEntity);
                const studentRepository = new StudentRepository(studentEntity, this.dataSource);
                const classRepository = this.createClassRespository();
                const parentsRepository = this.createParentRepository();
                return new CreateStudentService(studentRepository, classRepository, parentsRepository)
            case AccessType.TEACHER:
            case AccessType.ADMIN:
                let workerEntity = this.dataSource.getRepository(WorkerEntity);
                let workerRepository = new WorkerRepository(workerEntity, this.dataSource)
                let myClassRepository = this.createClassRespository();
                return new CreateWorkerService(workerRepository, myClassRepository);
            default:
                throw new Error('Invalid access type');
        }
    }

    public createParentRepository(): ParentRepository {
        let parentEntity = this.dataSource.getRepository(ParentEntity);
        return new ParentRepository(parentEntity, this.dataSource);
    }

    public createClassRespository(): ClassRepository {
        let classEntity = this.dataSource.getRepository(ClassEntity);
        return new ClassRepository(classEntity, this.dataSource);
    }
}
