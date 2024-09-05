import { WorkerEntity } from '../../infrastructure/entities/worker/worker.entity';
import { RepositoryInterface } from '../@shared/repository/repository.interface';

export interface WorkerRepositoryInterface extends RepositoryInterface<WorkerEntity> { }