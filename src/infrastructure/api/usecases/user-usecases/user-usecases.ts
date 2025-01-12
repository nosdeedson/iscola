import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/infrastructure/entities/user/user.entity';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { DataSource } from 'typeorm';
import { UserFactoryService } from './factory/user-factory/user-factory.service';
import { CreateUserDto } from '../../controllers/user/create-user-dto';
import { TrataErros } from 'src/infrastructure/utils/trata-erros/trata-erros';

@Injectable()
export class UserUsecases {

    private entity: any;
    private repository: any;
    constructor(
        @Inject('DATA_SOURCE') private dataSource: DataSource,
        private userFactory: UserFactoryService
    ){
        this.entity = this.dataSource.getRepository(UserEntity);
        this.repository = new UserRepository(this.entity, this.dataSource);
    }

    async create(dto: CreateUserDto): Promise<void>{
        try {
            console.log("user")
            let createUser = this.userFactory.userFactory(dto.typeAcces, );
            await createUser.createActor(dto);
            await createUser.createUser(dto);
        } catch (error) {
            TrataErros.tratarErrorsBadRequest(error)
        }
    }
}
