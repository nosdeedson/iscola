import { Injectable } from '@nestjs/common';
import { CreateGenericService } from 'src/domain-services/@shared/create-generic-service';
import { CreateParentService } from 'src/domain-services/parent/create/create.parent.service';
import { CreateStudentService } from 'src/domain-services/student/create/create.student.service';
import { CreateWorkerService } from 'src/domain-services/worker/create/create.worker.service';
import { AccessType } from 'src/domain/user/access.type';
import { UserAggregateResolverService } from '../user-aggregate-resolver/user-aggregate-resolver.service';

@Injectable()
export class CreateUserFactoryService {

    constructor(private readonly userAggregateContext: UserAggregateResolverService) { }

    public createUserServiceFactory(accessType: AccessType): CreateGenericService {
        try {
            const context = this.userAggregateContext.resolve(accessType);
            switch (context.accessType) {
                case AccessType.PARENT:
                    return new CreateParentService(context?.parentRepository);
                case AccessType.STUDENT:
                    return new CreateStudentService(context.studentRepository, context.classRepository, context.parentsRepository);
                case AccessType.TEACHER:
                case AccessType.ADMIN:
                    return new CreateWorkerService(context.workerRepository, context.classRepository);
                default:
                    throw new Error('Invalid access type');
            }
        } catch (error) {
            throw error;
        }
    }
}
