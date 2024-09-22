import { DataSource, QueryFailedError, Repository } from "typeorm";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { WorkerEntity } from "../../entities/worker/worker.entity";


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

    async find(id: string): Promise<WorkerEntity> {
        let worker = await this.workerRespository.findOne({
            where: { id: id },
            relations: {
                classes: true
            }
        });
        return worker;
    }

    async findAll(): Promise<WorkerEntity[]> {
        let all = await this.workerRespository.find();
        return all;
    }

    async update(entity: WorkerEntity, id: string) {
        await this.dataSource.createQueryBuilder()
            .update(WorkerEntity)
            .set({
                updatedAt: new Date(),
                role: entity.role,
            })
            .where("id= :id", { id: id })
            .execute();
    }

}