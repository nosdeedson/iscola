import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUsecases } from '../../usecases/user-usecases/user-usecases';
import { UserFactoryService } from '../../usecases/user-usecases/factory/user-factory/user-factory.service';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';

@Module({
  controllers: [UserController],
  providers: [
    UserUsecases,
    UserFactoryService,
  ],
  imports: [
    DataBaseConnectionModule,
  ]
})
export class UserModule {}
