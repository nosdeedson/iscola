import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { WorkerModel } from "./worker.model";

export class WorkerRepository implements WorkerRepositoryInterface {

    constructor(@InjectRepository(WorkerModel) private workerRespository: Repository<WorkerModel>,
        private dataSource: DataSource
    ) { }



    async create(entity: WorkerModel): Promise<void> {
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
    delete(id: string): Promise<WorkerModel> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<WorkerModel> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<WorkerModel[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: WorkerModel): Promise<void> {
        throw new Error("Method not implemented.");
    }

}