import { ChildEntity, Column, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { PersonModel } from "../@shared/person.model";
import { ClassModel } from "../class/class.model";
import { ParentModel } from "../parent/parent.model";
import { Student } from "src/domain/student/student";


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

    static toStudentModel(student: Student): StudentModel{
        let model = new StudentModel();
        model.birthday = student.getBirthday();
        model.createdAt = student.getCreatedAt();
        model.deletedAt = student.getDeletedAt();
        model.enrolled = student.getEnrolled();
        model.fullName = student.getName();
        model.id = student.getId();
        model.parents = ParentModel.toParentsModels(student.getParents());
        model.schoolGroup = ClassModel.toClassModel(student.getSchoolGroup());
        return model;
    }

    static toStudentsModels(students: Student[]): StudentModel[]{
        let models : StudentModel[] = [];
        students.forEach(it =>{
            let s = this.toStudentModel(it);
            models.push(s);
        })
        return models;
    }
}