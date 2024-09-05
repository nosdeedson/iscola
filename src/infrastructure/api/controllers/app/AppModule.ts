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
import { AppService } from "../../services/appservice/AppService";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env${process.env.NODE_ENV}`,
            //isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            username: process.env.POSTGRES_USER_NAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: true,
            port: 5432,
            entities: [
                AcademicSemesterEntity,
                ClassEntity,
                CommentEntity,
                RatingEntity,
                PersonEntity,
                StudentEntity,
                ParentEntity,
                WorkerEntity,
                UserEntity
            ]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule{}