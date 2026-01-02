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
import { UserAggregateResolverService } from '../user-aggregate-resolver/user-aggregate-resolver.service';

@Injectable()
export class DeleteUserFactoryService {

    constructor( private userAggregateContext: UserAggregateResolverService){}

    public deleteUserServiceFactory(accessType: AccessType): DeleteGenericService {
        const context = this.userAggregateContext.resolve(accessType);
        switch (context.accessType) {
            case AccessType.PARENT:
                return new DeleteParentService(context.parentRepository);
            case AccessType.STUDENT:
                return new DeleteStudentService(context.studentRepository);
            case AccessType.TEACHER:
            case AccessType.ADMIN:
                return new DeleteWorkerService(context.workerRepository);
            default:
                throw new SystemError([{context: "delete User", message: 'fail to create service to delete'}]);
        }
    }

}
