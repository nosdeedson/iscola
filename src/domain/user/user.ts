import { Entity } from "../@shared/entity";
import { Person } from "../@shared/person";
import { Validator } from '../@shared/validation/validator.interface'
import { UserValidator } from "./user.validator";

export class User extends Entity {

    private readonly person: Person;
    private readonly email: string;
    private readonly nickname: string;
    private readonly password: string;
    private readonly accessType: string;

    constructor(
        person: Person,
        email: string,
        nickname: string,
        password: string,
        accessType: string,
        id?: string, 
        createdAt?: Date, 
        updatedAt?: Date, 
        deletedAt?: Date
    ){
        super(id, createdAt, updatedAt, deletedAt)
        this.person = person;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.accessType = accessType;
        this.validate();
    }

    validate(){
        new UserValidator().validate(this);
    }

    getPerson(): Person{
        const person = this.person;
        return person;
    }

    getEmail(): string{
        const email = this.email;
        return email;
    }

    getNickname(): string{
        const nickname = this.nickname;
        return nickname;
    }

    getAccessType(): string{
        const accessType = this.accessType;
        return accessType;
    }

    getPassword(): string{
        const password = this.password;
        return password
    }

}