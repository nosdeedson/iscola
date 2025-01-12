import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller';
import { SemesterUsecases } from '../../usecases/semester-usecases/semester-usecases';
import { CreateAcademicSemesterService } from 'src/domain-services/academic-semester/create/create.academic-semester.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicSemesterEntity } from 'src/infrastructure/entities/academic-semester/academic.semester.entity';
import { AcademicSemesterRepository } from 'src/infrastructure/repositories/academic-semester/academic-semester.repository';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';

@Module({
    controllers: [
        SemesterController
    ],
    providers: [
        SemesterUsecases,
        CreateAcademicSemesterService,
        AcademicSemesterRepository,
    ],
    imports: [
        DataBaseConnectionModule,
    ]
})
export class SemesterModule {}
