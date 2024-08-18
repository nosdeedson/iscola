import { Person } from "../@shared/person";
import { RoleEnum } from "./roleEnum";
export declare class Worker extends Person {
    role: RoleEnum;
    constructor(birthday: Date, name: string, role: RoleEnum, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getRole(): RoleEnum;
}
