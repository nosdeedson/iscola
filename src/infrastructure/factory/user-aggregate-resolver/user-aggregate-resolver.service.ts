import { Inject, Injectable } from '@nestjs/common';
import { SystemError } from 'src/application/services/@shared/system-error';
import { AccessType } from 'src/domain/user/access.type';
import { ClassEntity } from 'src/infrastructure/entities/class/class.entity';
import { ParentEntity } from 'src/infrastructure/entities/parent/parent.entity';
import { StudentEntity } from 'src/infrastructure/entities/student/student.entity';
import { WorkerEntity } from 'src/infrastructure/entities/worker/worker.entity';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';
import { ParentRepository } from 'src/infrastructure/repositories/parent/parent.repository';
import { StudentRepository } from 'src/infrastructure/repositories/student/student.repository';
import { WorkerRepository } from 'src/infrastructure/repositories/worker/worker.repository';
import { DataSource } from 'typeorm';
import { RepositoryFactoryService } from '../repositiry-factory/repository-factory.service';
import { TypeRepository } from '../repositiry-factory/type-repository';

export interface ParentAggregateContext {
    accessType: AccessType.PARENT;
    parentRepository: ParentRepository;
}

export interface StudentAggregateContext {
    accessType: AccessType.STUDENT;
    studentRepository: StudentRepository;
    classRepository: ClassRepository;
    parentsRepository: ParentRepository;
}

export interface WorkerAggregateContext {
    accessType: AccessType.TEACHER | AccessType.ADMIN;
    workerRepository: WorkerRepository;
    classRepository: ClassRepository;
}

export type UserAggregateContext =
 | ParentAggregateContext
 | StudentAggregateContext
 | WorkerAggregateContext;

@Injectable()
export class UserAggregateResolverService {
    constructor(private repositoryFactory: RepositoryFactoryService){ }

    resolve(accessType: AccessType): UserAggregateContext {
        switch(accessType){
            case AccessType.PARENT:
                return {
                    accessType: accessType,
                    parentRepository: this.repositoryFactory.createRepository(TypeRepository.PARENT) as ParentRepository,
                };
            case AccessType.STUDENT:
                return {
                    accessType: accessType,
                    studentRepository: this.repositoryFactory.createRepository(TypeRepository.STUDENT) as StudentRepository,
                    classRepository: this.repositoryFactory.createRepository(TypeRepository.CLASS) as ClassRepository,
                    parentsRepository: this.repositoryFactory.createRepository(TypeRepository.PARENT) as ParentRepository,
                };
            case AccessType.TEACHER:
            case AccessType.ADMIN:
                return {
                    accessType: accessType,
                    workerRepository: this.repositoryFactory.createRepository(TypeRepository.WORKER) as WorkerRepository,
                    classRepository: this.repositoryFactory.createRepository(TypeRepository.CLASS) as ClassRepository,
                };
            default:
                throw new SystemError([{ context: 'UserAggregateResolver', message: 'Invalid access type' },]);
        }
    }; 
}
