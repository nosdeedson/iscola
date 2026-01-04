import { Injectable } from '@nestjs/common';
import { UserAggregateResolverService } from '../user-aggregate-resolver/user-aggregate-resolver.service';
import { AccessType } from 'src/domain/user/access.type';
import { SystemError } from 'src/domain-services/@shared/system-error';
import { FindParentService } from 'src/domain-services/parent/find/find.parent.service';
import { FindStudentService } from 'src/domain-services/student/find/find.student.service';
import { FindWorkerService } from 'src/domain-services/worker/find/find.worker.service';

@Injectable()
export class FindUserFactoryService {
    constructor(private userAggregateResolver: UserAggregateResolverService) {}

    async findUserServiceFactory(accessType: AccessType) {
        const context = this.userAggregateResolver.resolve(accessType);
        switch (context.accessType) {
            case AccessType.PARENT:
                return new FindParentService(context.parentRepository);
            case AccessType.STUDENT:
                return  new FindStudentService(context.studentRepository);
            case AccessType.TEACHER:
            case AccessType.ADMIN:
                return new FindWorkerService(context.workerRepository);
            default:
                throw new SystemError([{context: "find User", message: 'fail to create service to find user'}]);
        }
    }
}
