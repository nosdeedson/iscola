import { ParentStudentEntity } from "src/infrastructure/entities/parent-student/parent.student.entity";
import { DataSource, QueryFailedError, Repository } from "typeorm";

export class ParentStudentRepository {
    constructor(private repository: Repository<ParentStudentEntity>){}

    async save(entity: ParentStudentEntity): Promise<ParentStudentEntity>{
        try {
            return this.repository.save(entity);
        } catch (error) {
            console.log(error);
            throw new QueryFailedError(null, null, error);
        }
    }

}