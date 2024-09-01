import { PersonModel } from "../person.model";

export interface UserConverter<T>{
    converter(entity: T): PersonModel;
}