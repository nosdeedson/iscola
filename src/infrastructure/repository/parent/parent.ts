import { Entity, ManyToMany } from "typeorm";
import { GenericModel } from "../@shared/generis.model/generic.model";
import { StudentModel } from "../student/student.model";


@Entity('parent')
export class ParentModel extends GenericModel {

    @ManyToMany(() => StudentModel, student => student.parents)
    students: StudentModel[];

}