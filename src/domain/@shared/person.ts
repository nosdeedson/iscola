import { Entity } from '../@shared/entity'

export abstract class Person extends Entity{

    private birthday?: Date;
    private name?: string;

    constructor(params: {
        name: string,
        birthday?: Date,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    }) {
        let {name, birthday, id, createdAt, updatedAt, deletedAt} = params;
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