import { Module } from '@nestjs/common';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';
import { SchoolgroupController } from './schoolgroup.controller';
import { SchoolgroupUsecases } from '../../usecases/schoolgroup-usecases/schoolgroup-usecases';

@Module({
    controllers: [
        SchoolgroupController,
    ],
    imports: [
        DataBaseConnectionModule
    ],
    providers: [
        SchoolgroupUsecases
    ]
})
export class SchoolgroupModule { }
