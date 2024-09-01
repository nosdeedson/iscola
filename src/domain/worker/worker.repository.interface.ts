import { WorkerModel } from '../../infrastructure/repository/worker/worker.model';
import { RepositoryInterface } from '../@shared/repository/repository.interface';

export interface WorkerRepositoryInterface extends RepositoryInterface<WorkerModel> { }