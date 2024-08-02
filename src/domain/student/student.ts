import { Parent } from "../parent/parent";
import { Person } from "../@shared/person";

export class Student extends Person {

    matricula: string;
    parents: Parent[];
    constructor(
        id: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
        dataNascimento: Date,
        nome: string,
        matricula: string,
        parents: Parent[]
    ) {
        super(id, createdAt, updatedAt, deletedAt, dataNascimento, nome)
        this.matricula = matricula;
        this.parents = parents;
    }

}