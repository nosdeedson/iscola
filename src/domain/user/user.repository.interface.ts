import { UserEntity } from "src/infrastructure/entities/user/user.entity";
import { RepositoryInterface } from '../@shared/repository/repository.interface';

export interface UserRepositoryInterface extends RepositoryInterface<UserEntity>{}