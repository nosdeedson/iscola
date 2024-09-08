import { Rating } from 'src/domain/rating/rating';
import { RatingRepositoryInterface } from '../../../domain/rating/rating.repository.interface'
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { RatingEntity } from '../../../infrastructure/entities/rating/rating.entity';


export class RatingRepositiry implements RatingRepositoryInterface{

    constructor(
        private ratingRepository: Repository<RatingEntity>,
        private dataSource: DataSource
    ){}

    async create(entity: RatingEntity): Promise<void> {
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
            await queryRunner.release()
        }
    }

    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async find(id: string): Promise<RatingEntity> {
        const model = await this.ratingRepository.findOne({
            where: {id: id},
            relations: {
                student: true
            }
        });
        return model;
    }
    findAll(): Promise<RatingEntity[]> {
        throw new Error('Method not implemented.');
    }
    update(entity: RatingEntity, id: string) {
        throw new Error('Method not implemented.');
    }

}