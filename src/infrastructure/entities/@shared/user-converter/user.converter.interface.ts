import { PersonEntity } from "../person.entity";

export interface UserConverter<T>{
    converter(entity: T, relation?: any): PersonEntity;
}