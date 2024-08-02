import { Person } from "./person";
import { Student } from "./student";

export class Parent extends Person{

    students: Student[]

    constructor(
        id: string,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
        dataNascimento: Date,
        nome: string,
        students: Student[]
    ) {
        super(id, createdAt, updatedAt, deletedAt, dataNascimento, nome)
        this.students = students;
    }
    
}