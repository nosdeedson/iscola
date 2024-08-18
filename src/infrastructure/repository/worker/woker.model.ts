import { Column, Entity, OneToMany } from "typeorm";
import { Person } from "../@shared/person.model";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { ClassModel } from "../class/class.model";

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

    @OneToMany(() => ClassModel, (classes) => classes.teacher)
    classes: ClassModel[];

}
