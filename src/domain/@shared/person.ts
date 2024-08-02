import { Entity } from "./entity";

export abstract class Person extends Entity{
    dataNascimento: Date;
    nome: string;

    constructor(id: string, createdAt: Date, updatedAt: Date, deletedAt: Date, dataNascimento: Date, nome: string){
        super(id, createdAt, updatedAt, deletedAt)
        this.dataNascimento = dataNascimento;
        this.nome = nome;
    }
}