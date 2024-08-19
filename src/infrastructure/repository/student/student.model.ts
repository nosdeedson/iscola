import { ChildEntity, Column, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { PersonModel } from "../@shared/person.model";
import { ClassModel } from "../class/class.model";
import { ParentModel } from "../parent/parent.model";


@ChildEntity()
export class StudentModel extends PersonModel {

    constructor() { super() }

    @Column({
        nullable: false,
        name: 'enrolled',
        type: 'varchar',
        length: 10
    })
    enrolled: string;

    @ManyToMany(() => ParentModel, parent => parent.students)
    @JoinTable({
        name: 'student_parent',
    })
    parents: ParentModel[];

    @OneToOne(() => ClassModel, schoolGroup => schoolGroup.students)
    schoolGroup: ClassModel;
}