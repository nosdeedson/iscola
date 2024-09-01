import { Parent } from "src/domain/parent/parent";
import { Student } from "src/domain/student/student";
import { ChildEntity, ManyToMany } from "typeorm";
import { PersonModel } from "../@shared/person.model";
import { StudentModel } from "../student/student.model";


@ChildEntity()
export class ParentModel extends PersonModel {

    constructor() { super() }

    @ManyToMany(() => StudentModel, student => student.parents)
    students: StudentModel[];

    static toParentModel(parent: Parent): ParentModel {
        let model = new ParentModel();
        model.birthday = parent.getBirthday();
        model.createdAt = parent.getCreatedAt();
        model.deletedAt = parent.getDeletedAt();
        model.fullName = parent.getName();
        model.id = parent.getId();
        model.students = this.toStudentModel(parent.getStudents());
        model.updatedAt = parent.getUpdatedAt();
        return model;
    }

    private static toStudentModel(students: Student[]): StudentModel[] {
        let studentsModel: StudentModel[] = [];
        if (students.length == 0) {
            throw new Error('should inform at least one student');
        }
        students.forEach(it => {
            let model = new StudentModel();
            model.birthday = it.getBirthday();
            model.createdAt = it.getBirthday();
            model.deletedAt = it.getBirthday();
            model.enrolled = it.getEnrolled();
            model.fullName = it.getName();
            model.id = it.getId();
            model.updatedAt = it.getUpdatedAt();
        })
        return studentsModel;
    }

    static toParentsModels(parents: Parent[]): ParentModel[] {
        let models = parents.map(it => this.toParentModel(it));
        return models;
    }
}