import { Person } from "../@shared/person";
import { RoleEnum } from "./roleEnum";

export class Teacher extends Person{

    role: RoleEnum;

    constructor(
        id: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
        dataNascimento: Date,
        nome: string,
        role: RoleEnum
    ) {
        super(id, createdAt, updatedAt, deletedAt, dataNascimento, nome);
        this.role = role;
    }
}