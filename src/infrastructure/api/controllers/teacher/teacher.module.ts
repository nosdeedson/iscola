import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherListClassesUsecase } from 'src/application/usecases/teacher-list-classes-usecase/teacher-list-classes-usecase';
import { RepositoryFactoryService } from 'src/infrastructure/factory/repositiry-factory/repository-factory.service';
import { DataBaseConnectionModule } from 'src/infrastructure/data-base-connection/data-base-connection.module';
import { ClassRepository } from 'src/infrastructure/repositories/class/class.repository';

@Module({
    controllers: [
        TeacherController
    ],
    providers: [
        TeacherListClassesUsecase,
        RepositoryFactoryService,
        ClassRepository
    ], 
    imports: [
        DataBaseConnectionModule
    ]
})
export class TeacherModule {}
