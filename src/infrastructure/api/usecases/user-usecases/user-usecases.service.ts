import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/infrastructure/entities/user/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { DataSource } from 'typeorm';
import { CreateWorkersDto } from '../../controllers/users/workers/create-workers-dto/create-workers-dto';
import { CreateUserService } from 'src/domain-services/user/create/create.user.service';
import { PersonEntity } from 'src/infrastructure/entities/@shared/person.entity';
import { WorkerRepository } from 'src/infrastructure/repositories/worker/worker.repository';
import { CreateWorkerService } from 'src/domain-services/worker/create/create.worker.service';
import { ClassEntity } from 'src/infrastructure/entities/class/class.entity';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';
import { InputCreateWorkerDto } from 'src/domain-services/worker/create/create.worker.dto';
import { TrataErros } from 'src/infrastructure/utils/trata-erros/trata-erros';
import { InputCreateUserDto } from 'src/domain-services/user/create/input.create.user.dto';

@Injectable()
export class UserUsecasesService {
    userEntity: any;
    userRepository: any;

    workerEntity: any;
    workerRepository: any;

    classEntity: any;
    classRepository: any;

    constructor(
        @Inject('DATA_SOURCE') private dataSource: DataSource,
    ) {
        this.userEntity = this.dataSource.getRepository(UserEntity);
        this.userRepository = new UserRepository(this.userEntity, this.dataSource);
        this.workerEntity = this.dataSource.getRepository(PersonEntity);
        this.workerRepository = new WorkerRepository(this.workerEntity, this.dataSource);
        this.classEntity = this.dataSource.getRepository(ClassEntity);
        this.classRepository = new ClassRepository(this.classEntity, this.dataSource);
    }

    async create(dto: CreateWorkersDto): Promise<void> {
        try {
            let createWorker = new CreateWorkerService(this.workerRepository, this.classRepository);
            let inputWorker = new InputCreateWorkerDto(dto);
            const person = await createWorker.execute(inputWorker);
            let createUser = new CreateUserService(this.userRepository, this.userRepository);
            let input = new InputCreateUserDto(dto, person.id);
            createUser.execute(input);
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error);
        }
    }
}
