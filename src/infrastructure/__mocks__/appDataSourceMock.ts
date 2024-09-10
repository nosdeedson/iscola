import { DataSource } from "typeorm";
import { WorkerEntity } from "../entities/worker/worker.entity";
import { PersonEntity } from "../entities/@shared/person.entity";
import { StudentEntity } from "../entities/student/student.entity";
import { ParentEntity } from "../entities/parent/parent.entity";
import { ClassEntity } from "../entities/class/class.entity";
import { AcademicSemesterEntity } from "../entities/academic-semester/academic.semester.entity";
import { CommentEntity } from "../entities/comment/comment.entity";
import { RatingEntity } from "../entities/rating/rating.entity";
import { UserEntity } from "../entities/user/user.entity";

export class AppDataSourceMock {

    static mockAppDataSource(): DataSource{
        return new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234@Mudar",
            database: "iscola",
            entities: [
                WorkerEntity,
                PersonEntity,
                StudentEntity,
                ParentEntity,
                ClassEntity,
                AcademicSemesterEntity,
                CommentEntity,
                RatingEntity,
                UserEntity
            ],
            synchronize: true,
            logging: false,
            // driver: 'pg'
        });
    }

}