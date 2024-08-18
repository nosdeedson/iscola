import { Entity } from "../@shared/entity";
import { Person } from "../@shared/person";
export declare class User extends Entity {
    protected readonly person: Person;
    protected readonly email: string;
    protected readonly nickname: string;
    protected readonly password: string;
    protected readonly accessType: string;
    constructor(person: Person, email: string, nickname: string, password: string, accessType: string, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getPerson(): Person;
    getEmail(): string;
    getNickname(): string;
    getAccessType(): string;
    getPassword(): string;
}
