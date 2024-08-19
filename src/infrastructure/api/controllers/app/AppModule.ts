import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonModel } from "src/infrastructure/repository/@shared/person.model";
import { AcademicSemesterModel } from "src/infrastructure/repository/academic-semester/academic.semester.model";
import { ClassModel } from "src/infrastructure/repository/class/class.model";
import { CommentModel } from "src/infrastructure/repository/comment/comment.model";
import { RatingModel } from "src/infrastructure/repository/rating/rating";
import { UserModel } from "src/infrastructure/repository/user/user.model";
import { AppService } from "../../services/appservice/AppService";
import { AppController } from "./AppController";
import { ConfigModule } from "@nestjs/config";

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
                AcademicSemesterModel,
                ClassModel,
                CommentModel,
                RatingModel,
                PersonModel,
                UserModel
            ]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule{}