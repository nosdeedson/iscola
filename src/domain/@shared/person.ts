import { Entity } from "./entity";

export abstract class Person extends Entity{

    birthday: Date;
    name: string;

    constructor(
        birthday: Date, 
        name: string,
        id?: string, 
        createdAt?: Date, 
        updatedAt?: Date, 
        deletedAt?: Date, 
    )
        {
        super(id, createdAt, updatedAt, deletedAt)
        this.birthday = birthday;
        this.name = name;
    }

    getBirthDay(): Date{
        return this.birthday;
    }

    getName(): string{
        return this.name;
    }
}