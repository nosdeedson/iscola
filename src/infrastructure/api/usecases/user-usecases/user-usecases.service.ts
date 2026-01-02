import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import { DeleteUserService } from 'src/domain-services/user/delete/delete.user.service';
import { DeleteWorkerService } from 'src/domain-services/worker/delete/delete.worker.service';
import { FindUserOutPutDto } from '../../controllers/users/workers/find-user-dto/find-user-outPut-dto';
import { FindUserService } from 'src/domain-services/user/find/find.user.service';
import { FindAllUserService } from 'src/domain-services/user/findAll/findAll.user.service';
import { CreateUserServiceFactory } from 'src/infrastructure/factory/create-user-service-factory/create-user-service-factory';
import { DeleteUserFactoryService } from 'src/infrastructure/factory/delete-user-factory/delete-user-factory.service';

@Injectable()
export class UserUsecasesService {
    userEntity: any;
    userRepository: any;

    constructor(
        @Inject('DATA_SOURCE') private dataSource: DataSource,
        private userServiceFactory: CreateUserServiceFactory,
        private userDeleteFactory: DeleteUserFactoryService,
    ) {
        this.userEntity = this.dataSource.getRepository(UserEntity);
        this.userRepository = new UserRepository(this.userEntity, this.dataSource);
    }

    async create(dto: CreateWorkersDto): Promise<void> {
        try {
            let inputWorker = new InputCreateWorkerDto(dto);
            let createperson = this.userServiceFactory.createUserServiceFactory(dto.accessType);
            const person = await createperson.execute(inputWorker);
            let createUser = new CreateUserService(this.userRepository, createperson.personRepository);
            let input = new InputCreateUserDto(dto, person.id);
            await createUser.execute(input);
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            let userFindService = new FindUserService(this.userRepository);
            let userToDelete = await userFindService.execute(id);
            let deletePerson = await this.userDeleteFactory.deleteUserServiceFactory(userToDelete.accessType);
            await deletePerson.execute(userToDelete.personId);
            let deleteUserService = new DeleteUserService(this.userRepository);
            await deleteUserService.execute(id);
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error);
        }
    }

    async find(id: string): Promise<FindUserOutPutDto> {
        try {
            // let findUserService = new FindUserService(this.userRepository);
            // let user = await findUserService.execute(id);
            // let person = await this.workerRepository.find(user.personId);
            // return new FindUserOutPutDto(user, person.name);
            return null;
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error);
        }
    }

    async findAll(): Promise<FindUserOutPutDto[]>{
        // let findAllUserService = new FindAllUserService(this.userRepository);
        // const users = await findAllUserService.execute();
        // const usersOutput = [];
        // for (const user of users.all) {
        //     let person = await this.workerRepository.find(user.personId);
        //     usersOutput.push(new FindUserOutPutDto(user, person.name));
        // }
        // return usersOutput;
        return null;
    }

}
