import { ChildEntity, Column, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { PersonModel } from "../@shared/person.model";
import { ClassModel } from "../class/class.model";
import { ParentModel } from "../parent/parent.model";
import { Student } from "../../../domain/student/student";
import { Parent } from "../../../domain/parent/parent";


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
        model.updatedAt = student.getUpdatedAt();
        model.enrolled = student.getEnrolled();
        model.fullName = student.getName();
        model.id = student.getId();
        model.parents = this.toParentModel(student.getParents())
        model.schoolGroup = ClassModel.toClassModel(student.getSchoolGroup());
        return model;
    }

    private static toParentModel(parents: Parent[]): ParentModel[]{
        if(parents.length == 0){
            throw new Error('should inform at least one parent')
        }
        let parentsModel : ParentModel[] = [];
        parents.forEach(it => {
            let model = new ParentModel();
            model.birthday = it.getBirthday();
            model.createdAt = it.getCreatedAt();
            model.deletedAt = it.getDeletedAt();
            model.fullName = it.getName();
            model.id = it.getId();
            model.updatedAt = it.getUpdatedAt(); 
            parentsModel.push(model)
        })
               
        return parentsModel;
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