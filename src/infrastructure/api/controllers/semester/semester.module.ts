import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller';
import { SemesterUsecases } from '../../usecases/semester-usecases/semester-usecases';
import { CreateAcademicSemesterService } from 'src/domain-services/academic-semester/create/create.academic-semester.service';
import { AcademicSemesterRepository } from 'src/infrastructure/repositories/academic-semester/academic-semester.repository';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';
import { RepositoryFactoryService } from 'src/infrastructure/factory/repositiry-factory/repository-factory.service';

@Module({
    controllers: [
        SemesterController
    ],
    providers: [
        SemesterUsecases,
        CreateAcademicSemesterService,
        AcademicSemesterRepository,
        RepositoryFactoryService
    ],
    imports: [
        DataBaseConnectionModule,
    ]
})
export class SemesterModule {}
