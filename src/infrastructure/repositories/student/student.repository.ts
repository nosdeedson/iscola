import { StudentEntity } from '../../../infrastructure/entities/student/student.entity';
import { StudentRepositoryInterface } from '../../../domain/student/student.repository.interface';
import { DataSource, QueryFailedError, Repository } from 'typeorm';


export class StudentRepository implements StudentRepositoryInterface{

    constructor(
        private studentRepository: Repository<StudentEntity>,
        private dataSource: DataSource
    ){}

    async create(entity: StudentEntity): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new QueryFailedError(null, null, error);
        }
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.createQueryBuilder()
            .update(StudentEntity)
            .set({
                deletedAt: new Date(),
            })
            .execute();
    }

    async find(id: string): Promise<StudentEntity> {
        return await this.studentRepository.findOne({
            where: {id: id},
            relations: {
                schoolGroup: true
            }
        });
    }

    async findAll(): Promise<StudentEntity[]> {
        return await this.studentRepository.find();
    }

    async update(entity: StudentEntity, id: string) {
        this.dataSource.createQueryBuilder()
            .update(StudentEntity)
            .set({
                schoolGroup: entity.schoolGroup
            })
            .where({id: id})
            .execute();
    }

}