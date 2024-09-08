import { AcademicSemesterEntity } from '../../../infrastructure/entities/academic-semester/academic.semester.entity';
import { AcademicSemesterInterface } from '../../../domain/academc-semester/academic.semester.repository.interface';
import { DataSource, QueryFailedError, Repository } from 'typeorm';

export class AcademicSemesterRepository implements AcademicSemesterInterface{
    
    constructor(
        private academicRepositoryRepository: Repository<AcademicSemesterEntity>,
        private dataSource: DataSource
    ){}

    async create(entity: AcademicSemesterEntity): Promise<void> {
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
        } finally{
            await queryRunner.release();
        }
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.createQueryBuilder()
            .update(AcademicSemesterEntity)
            .set({
                deletedAt: new Date()
            })
            .where('id= :id', {id: id})
            .execute()
    }

    async find(id: string): Promise<AcademicSemesterEntity> {
        const model = await this.academicRepositoryRepository.findOne({
            where: {id: id}
        })
        return model;
    }

    async findAll(): Promise<AcademicSemesterEntity[]> {
        return await this.academicRepositoryRepository.find();
    }

    async update(entity: AcademicSemesterEntity, id: string) {
        await this.dataSource.createQueryBuilder()
            .update(AcademicSemesterEntity)
            .set({
                updatedAt: new Date(),
                actual: entity.actual,
            })
            .execute();
    }

}
