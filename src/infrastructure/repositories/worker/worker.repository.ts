import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { WorkerEntity } from "../../entities/worker/worker.entity";
import { ClassEntity } from "src/infrastructure/entities/class/class.entity";


export class WorkerRepository implements WorkerRepositoryInterface {

    constructor(
        private workerRespository: Repository<WorkerEntity>,
        private dataSource: DataSource
    ) { }

    async create(entity: WorkerEntity): Promise<void> {
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
        } finally {
            await queryRunner.release();
        }
    }

    async delete(id: string): Promise<void> {
        this.dataSource.createQueryBuilder()
            .update(WorkerEntity)
            .set({ deletedAt: new Date() })
            .where("id= :id", { id: id })
            .execute();
    }

    find(id: string): Promise<WorkerEntity> {
        let worker = this.workerRespository.findOne({
            where: { id: id},
            relations: {
                classes: true
            }
        });
        return worker;
    }

    findAll(): Promise<WorkerEntity[]> {
        let all = this.workerRespository.find({relations: { classes: true}});
        return all;
    }

    update(entity: WorkerEntity, id: string){
        this.dataSource.createQueryBuilder()
            .update(WorkerEntity)
            .set({ 
                updatedAt: new Date(),
                role: entity.role,
             })
            .where("id= :id", { id: id })
            .execute();
    }

}