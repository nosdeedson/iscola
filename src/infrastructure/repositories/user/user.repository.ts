import { UserRepositoryInterface } from "src/domain/user/user.repository.interface";
import { UserEntity } from "src/infrastructure/entities/user/user.entity";
import { DataSource, Repository } from "typeorm";

export class UserRepository implements UserRepositoryInterface{

    constructor(
        private userRespository: Repository<UserEntity>,
        private dataSource: DataSource
    ){}
  
    async create(entity: UserEntity): Promise<void> {
        try {
            await this.userRespository.save(entity);
        } catch (error) {
            throw error;
        }    
    }

    async delete(id: string): Promise<void> {
        await this.dataSource.createQueryBuilder()
            .update(UserEntity)
            .set({
                deletedAt: new Date()
            })
            .where('id= :id', {id: id})
            .execute()
    }

    async find(id: string): Promise<UserEntity> {
        let user = await this.userRespository.findOne({
            where: {id: id},
            relations:{
                person: true
            }
        });
        return user;
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRespository.find()
    }
    
    async update(entity: UserEntity): Promise<void> {
        this.userRespository.save(entity);
    }

}