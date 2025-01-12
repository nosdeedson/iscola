import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./AppController";
import { ConfigModule } from "@nestjs/config";
import { AcademicSemesterEntity } from "src/infrastructure/entities/academic-semester/academic.semester.entity";
import { ClassEntity } from "../../../../infrastructure/entities/class/class.entity";
import { CommentEntity } from "../../../../infrastructure/entities/comment/comment.entity";
import { RatingEntity } from "../../../../infrastructure/entities/rating/rating.entity";
import { PersonEntity } from "../../../../infrastructure/entities/@shared/person.entity";
import { StudentEntity } from "../../../../infrastructure/entities/student/student.entity";
import { ParentEntity } from "../../../../infrastructure/entities/parent/parent.entity";
import { WorkerEntity } from "../../../../infrastructure/entities/worker/worker.entity";
import { UserEntity } from "../../../../infrastructure/entities/user/user.entity";
import { AppUseCase } from "../../usecases/app-usecase/app-usecase";
import { SemesterModule } from "../semester/semester.module";
import { SchoolgroupModule } from "../schoolgroup/schoolgroup.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        SchoolgroupModule,
        SemesterModule,
        UserModule,
        ConfigModule.forRoot({
            envFilePath: `.env${process.env.NODE_ENV}`,
            //isGlobal: true
        }),
    ],
    controllers: [AppController],
    providers: [AppUseCase]
})
export class AppModule{}