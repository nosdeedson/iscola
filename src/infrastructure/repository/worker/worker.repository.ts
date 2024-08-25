import { InjectRepository } from "@nestjs/typeorm";
import { Worker } from "src/domain/worker/worker";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { WorkerRepositoryInterface } from "../../../domain/worker/worker.repository.interface";
import { WokerModel } from "./worker.model";

export class WorkerRepository implements WorkerRepositoryInterface {

    constructor(@InjectRepository(WokerModel) private workerRespository: Repository<WokerModel>,
        private dataSource: DataSource
    ) {}



    async create(entity: Worker): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            let model = WokerModel.toWorkerModel(entity);
            await queryRunner.manager.save(model);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new QueryFailedError(null, null, error);
        }finally{
            await queryRunner.release();
        }
    }
    delete(id: string): Promise<Worker> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Worker> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Worker[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: Worker): Promise<void> {
        throw new Error("Method not implemented.");
    }

}