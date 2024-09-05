import { WorkerRepositoryInterface } from "../../domain/worker/worker.repository.interface";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { WorkerEntity } from "../entities/worker/worker.entity";


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
    delete(id: string): Promise<WorkerEntity> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<WorkerEntity> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<WorkerEntity[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: WorkerEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

}