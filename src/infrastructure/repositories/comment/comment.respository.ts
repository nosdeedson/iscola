import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { CommentRepositoryInterface } from '../../../domain/comment/comment.repository.interface';
import { CommentEntity } from '../../../infrastructure/entities/comment/comment.entity';


export class CommentRepository implements CommentRepositoryInterface{

    constructor(
        private commentRepository: Repository<CommentEntity>,
        private dataSource: DataSource
    ){    }

    async create(entity: CommentEntity): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.manager.save(entity);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error)
            await queryRunner.rollbackTransaction();
            throw new QueryFailedError(null, null, error);
        } finally{
            await queryRunner.release();
        }
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.createQueryBuilder()
            .update(CommentEntity)
            .set({
                deletedAt: new Date()
            })
            .where('id= :id', { id: id })
            .execute();
    }

    async find(id: string): Promise<CommentEntity> {
        const model = await this.commentRepository.findOne({
            where: {id: id}
        })
        return model;
    }

    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository.find();
    }

    async update(entity: CommentEntity, id: string) {
        await this.dataSource.createQueryBuilder()
            .update(CommentEntity)
            .set(
                {
                    comment: entity.comment
                }
            )
            .where('id= :id', {id : id})
            .execute();
    }
    
}