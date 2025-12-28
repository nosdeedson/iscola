import { Module } from '@nestjs/common';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';
import { UsersController } from './workers/users.controller';
import { UserUsecasesService } from '../../usecases/user-usecases/user-usecases.service';

@Module({
    imports: [DataBaseConnectionModule],
    controllers: [
        UsersController,
    ],
    providers: [
        UserUsecasesService,
    ],
    exports: [],
})
export class UsersModule {}
