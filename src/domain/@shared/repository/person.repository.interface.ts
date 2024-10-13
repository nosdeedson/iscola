import { PersonEntity } from "src/infrastructure/entities/@shared/person.entity";
import { RepositoryInterface } from "./repository.interface";

export interface PeronRepositoryInterface<T> extends RepositoryInterface<PersonEntity>{}