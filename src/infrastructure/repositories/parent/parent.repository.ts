import { ParentEntity } from 'src/infrastructure/entities/parent/parent.entity';
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
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    find(id: string): Promise<ParentEntity> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<ParentEntity[]> {
        throw new Error('Method not implemented.');
    }
    update(entity: ParentEntity, id: string) {
        throw new Error('Method not implemented.');
    }
    
}

