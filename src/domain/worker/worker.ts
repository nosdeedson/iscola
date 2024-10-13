import { PersonEntity } from "src/infrastructure/entities/@shared/person.entity";
import { Person } from "../@shared/person";
import { Class } from "../class/class";
import { RoleEnum } from "./roleEnum";
import { WorkerValidator } from "./worker.validator";
import { AccessType } from "../user/access.type";
import { WorkerEntity } from "src/infrastructure/entities/worker/worker.entity";

export class Worker extends Person {

    private role: RoleEnum;
    private classes: Class[]

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

    validate() {
        new WorkerValidator().validate(this);
    }

    getRole(): RoleEnum {
        return this.role;
    }

    setRole(role: RoleEnum) {
        this.role = role;
    }

    getClasses(): Class[] {
        return this.classes;
    }

    setClass(c: Class) {
        if (!this.classes) {
            this.classes = [];
        }
        this.classes.push(c);
    }

    static toDomain(person: WorkerEntity, accessType: AccessType): Worker{
        if(AccessType.ADMIN == accessType || AccessType.TEACHER == accessType ){
            return new Worker(
                person.birthday,
                person.fullName,
                person.role,
                person.id,
                person.createdAt,
                person.updatedAt,
                person.deletedAt
            );
        }
    }

}