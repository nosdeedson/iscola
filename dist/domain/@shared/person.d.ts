import { Entity } from '../@shared/entity';
export declare abstract class Person extends Entity {
    birthday: Date;
    name: string;
    constructor(birthday: Date, name: string, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    getBirthDay(): Date;
    getName(): string;
}
