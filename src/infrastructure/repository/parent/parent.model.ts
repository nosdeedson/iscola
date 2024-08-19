import { ChildEntity, ManyToMany } from "typeorm";
import { PersonModel } from "../@shared/person.model";
import { StudentModel } from "../student/student.model";


@ChildEntity()
export class ParentModel extends PersonModel {

    constructor() { super() }

    @ManyToMany(() => StudentModel, student => student.parents)
    students: StudentModel[];

}