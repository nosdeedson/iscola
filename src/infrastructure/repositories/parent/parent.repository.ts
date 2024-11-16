import { ParentEntity } from '../../../infrastructure/entities/parent/parent.entity';
import { ParentReporitoryInterface } from '../../../domain/parent/parent.repository.interface';
import { DataSource, QueryFailedError, Repository } from 'typeorm';


export class ParentRepository implements ParentReporitoryInterface{

    constructor(
        private parentRepository: Repository<ParentEntity>,
        private dataSource: DataSource
    ){}

    async create(entity: ParentEntity): Promise<void> {
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
            .update(ParentEntity)
            .set({
                deletedAt : new Date()
            })
            .where('id= :id', { id: id })
            .execute();
    }

    async find(id: string): Promise<ParentEntity> {
        const model = await this.parentRepository.findOne({
            where: {id: id},
            relations:{
                students: true
            }
        })
        return model;
    }

    async findAll(): Promise<ParentEntity[]> {
        return await this.parentRepository.find({
            relations:{
                students : true
            }
        })
    }

    async update(entity: ParentEntity) {
        await this.parentRepository.save(entity)
    }
    
}

