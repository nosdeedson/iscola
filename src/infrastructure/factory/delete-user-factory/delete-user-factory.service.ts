import { Inject, Injectable } from '@nestjs/common';
import { DeleteGenericService } from 'src/domain-services/@shared/delete-generic-service';
import { SystemError } from 'src/domain-services/@shared/system-error';
import { DeleteParentService } from 'src/domain-services/parent/delete/delete.parent.service';
import { DeleteStudentService } from 'src/domain-services/student/delete/delete.student.service';
import { DeleteWorkerService } from 'src/domain-services/worker/delete/delete.worker.service';
import { AccessType } from 'src/domain/user/access.type';
import { ParentEntity } from 'src/infrastructure/entities/parent/parent.entity';
import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { WorkerEntity } from 'src/infrastructure/entities/worker/worker.entity';
import { ParentRepository } from 'src/infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from 'src/infrastructure/repositories/student/student.repository';
import { WorkerRepository } from 'src/infrastructure/repositories/worker/worker.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class DeleteUserFactoryService {

    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource ){}

    public async deleteUserServiceFactory(accessType: AccessType): Promise<DeleteGenericService> {
        switch (accessType) {
            case AccessType.PARENT:
                let parentEntity = this.dataSource.getRepository(ParentEntity);
                let parentRepository = new ParentRepository(parentEntity, this.dataSource);
                return new DeleteParentService(parentRepository);
            case AccessType.STUDENT:
                let studentEntity = this.dataSource.getRepository(StudentEntity);
                let studentRepository = new StudentRepository(studentEntity, this.dataSource);
                return new DeleteStudentService(studentRepository);
            case AccessType.TEACHER:
            case AccessType.ADMIN:
                let workerEntity = this.dataSource.getRepository(WorkerEntity);
                let workerRepository = new WorkerRepository(workerEntity, this.dataSource);
                return new DeleteWorkerService(workerRepository);
            default:
                throw new SystemError([{context: "delete User", message: 'fail to create service to delete'}]);
        }
    }

}
