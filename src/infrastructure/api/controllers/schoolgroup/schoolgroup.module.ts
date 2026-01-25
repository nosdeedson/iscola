import { Module } from '@nestjs/common';
import { SchoolgroupController } from './schoolgroup.controller';
import { SchoolgroupUseCases } from '../../../../aplication/usecases/schoolgroup-usecases/schoolgroup-usecases';
import { RepositoryFactoryService } from 'src/infrastructure/factory/repositiry-factory/repository-factory.service';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';

@Module({
    controllers: [
        SchoolgroupController,
    ],
    providers: [
        SchoolgroupUseCases,
        RepositoryFactoryService
    ],
    imports: [DataBaseConnectionModule]
})
export class SchoolgroupModule { }
