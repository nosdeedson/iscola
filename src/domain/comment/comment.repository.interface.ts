import { CommentEntity } from 'src/infrastructure/entities/comment/comment.entity';
import { RepositoryInterface } from '../@shared/repository/repository.interface'

export interface CommentRepositoryInterface extends RepositoryInterface<CommentEntity>{}