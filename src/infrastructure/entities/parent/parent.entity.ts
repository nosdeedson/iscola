import { Parent } from "src/domain/parent/parent";
import { Student } from "src/domain/student/student";
import { ChildEntity, ManyToMany } from "typeorm";
import { PersonEntity } from "../@shared/person.entity";
import { StudentEntity } from "../student/student.entity";


@ChildEntity()
export class ParentEntity extends PersonEntity {

    constructor() { super() }

    @ManyToMany(() => StudentEntity, student => student.parents)
    students: StudentEntity[];

    static toParentModel(parent: Parent): ParentEntity {
        let model = new ParentEntity();
        model.birthday = parent.getBirthday();
        model.createdAt = parent.getCreatedAt();
        model.deletedAt = parent.getDeletedAt();
        model.fullName = parent.getName();
        model.id = parent.getId();
        model.students = this.toStudentModel(parent.getStudents());
        model.updatedAt = parent.getUpdatedAt();
        return model;
    }

    private static toStudentModel(students: Student[]): StudentEntity[] {
        let studentsModel: StudentEntity[] = [];
        if (students.length == 0) {
            throw new Error('should inform at least one student');
        }
        students.forEach(it => {
            let model = new StudentEntity();
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

    static toParentsModels(parents: Parent[]): ParentEntity[] {
        let models = parents.map(it => this.toParentModel(it));
        return models;
    }
}