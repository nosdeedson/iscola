import { Entity } from '../@shared/entity'

export abstract class Person extends Entity{

    private birthday: Date;
    private name: string;

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

    getBirthday(): Date{
        return this.birthday;
    }

    setBirthDay(date: Date){
        this.birthday = date;
    }

    getName(): string{
        return this.name;
    }

    setName(name: string){
        this.name = name;
    }
}