import { ParentEntity } from 'src/infrastructure/entities/parent/parent.entity';
import { PeronRepositoryInterface } from '../@shared/repository/person.repository.interface';


export interface ParentReporitoryInterface extends PeronRepositoryInterface<ParentEntity> { }
