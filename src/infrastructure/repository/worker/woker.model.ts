import { ChildEntity, Column, OneToMany } from "typeorm";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { PersonModel } from "../@shared/person.model";
import { ClassModel } from "../class/class.model";

@ChildEntity()
export class WokerModel extends PersonModel {

    constructor() { super() }

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
