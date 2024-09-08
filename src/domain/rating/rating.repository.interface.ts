import { RatingEntity } from '../../infrastructure/entities/rating/rating.entity'
import { RepositoryInterface } from '../@shared/repository/repository.interface'

export interface RatingRepositoryInterface extends RepositoryInterface<RatingEntity>{}