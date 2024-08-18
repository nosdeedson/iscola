import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { GenericModel } from "../@shared/generis.model/generic.model";
import { ClassModel } from "../class/class.model";
import { ParentModel } from "../parent/parent";


@Entity('student')
export class StudentModel extends GenericModel {

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

    @OneToOne(() => ClassModel, schoolGroup => schoolGroup.students )
    schoolGroup: ClassModel;
}