import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RoleAccess } from 'src/infrastructure/api/controllers/user/type-access.enum';
import { CreateUserParent } from '../../../services/create-users/create-user-parent/create-user-parent';
import { CreateUserStudent } from '../../../services/create-users/create-user-student/create-user-student.service';
import { CreateUserTeacher } from '../../../services/create-users/create-user-teacher/create-user-teacher';
import { WorkerRepository } from 'src/infrastructure/repositories/worker/worker.repository';
import { DataSource } from 'typeorm';
import { ParentRepository } from 'src/infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from 'src/infrastructure/repositories/student/student.repository';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';

@Injectable()
export class UserFactoryService {

    repository: any;

    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource){}

    private userService: any;

    userFactory(type: RoleAccess,): any {
        switch (type) {
            case RoleAccess.PARENT: {
                this.repository = this.dataSource.getRepository(ParentRepository)
                return new CreateUserParent(this.repository);
            }
            case RoleAccess.STUDENT: {
                this.repository = this.dataSource.getRepository(StudentRepository)
                return new CreateUserStudent(this.repository);
            }
            case RoleAccess.TEACHER: {
                this.repository = this.dataSource.getRepository(WorkerRepository);
                let schoolgroupRepository = this.dataSource.getRepository(ClassRepository) as any;
                return new CreateUserTeacher(this.repository, schoolgroupRepository);
            }
            default: {
                throw new BadRequestException("Type of user not defined.")
            }
        }
    }
}
