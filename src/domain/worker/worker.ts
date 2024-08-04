import { Person } from "../@shared/person";
import { RoleEnum } from "./roleEnum";
import { TeacherValidator } from "./worker.validator";

export class Worker extends Person{

    // TODO add classroom

    role: RoleEnum;

    constructor(
        birthday: Date,
        name: string,
        role: RoleEnum,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    ) {
        super(birthday, name, id, createdAt, updatedAt, deletedAt);
        this.role = role;
        this.validate();
    }

    validate(){
        new TeacherValidator().validate(this);
    }

    getRole(): RoleEnum{
        return this.role;
    }
}