import { ChildEntity, ManyToMany } from "typeorm";
import { PersonModel } from "../@shared/person.model";
import { StudentModel } from "../student/student.model";
import { Parent } from "src/domain/parent/parent";


@ChildEntity()
export class ParentModel extends PersonModel {

    constructor() { super() }

    @ManyToMany(() => StudentModel, student => student.parents)
    students: StudentModel[];

    static toParentModel(parent: Parent): ParentModel{
        let model = new ParentModel();
        model.birthday = parent.getBirthday();
        model.createdAt = parent.getCreatedAt();
        model.deletedAt = parent.getDeletedAt();
        model.fullName = parent.getName();
        model.id = parent.getId();
        model.students = StudentModel.toStudentsModels(parent.getStudents());
        model.updatedAt = parent.getUpdatedAt();
        return model;
    }

    static toParentsModels(parents: Parent[]): ParentModel[]{
        let models = parents.map(it => this.toParentModel(it));
        return models;
    }
}