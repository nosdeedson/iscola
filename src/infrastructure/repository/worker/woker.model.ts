import { Column, Entity, OneToMany } from "typeorm";
import { Person } from "../@shared/person.model";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Class } from '../class/class.model'

@Entity('worker')
export class WokerModel extends Person {
    
    @Column({
        nullable: false,
        type: 'enum',
        enum: [
            RoleEnum.ADMINISTRATOR,
            RoleEnum.TEACHER
        ]
    })
    role: RoleEnum;

    //@OneToMany({})
    classes: Class[];

}
