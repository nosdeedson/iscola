import { ChildEntity, Column, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { PersonEntity } from "../@shared/person.entity";
import { ClassEntity } from "../class/class.entity";
import { ParentEntity } from "../parent/parent.entity";
import { Student } from "../../../domain/student/student";
import { Parent } from "../../../domain/parent/parent";


@ChildEntity()
export class StudentEntity extends PersonEntity {

    constructor() { super() }

    @Column({
        nullable: false,
        name: 'enrolled',
        type: 'varchar',
        length: 10
    })
    enrolled: string;

    @ManyToMany(() => ParentEntity, parent => parent.students, {cascade: true, onDelete: "CASCADE"})
    @JoinTable({
        name: 'student_parent',
        inverseJoinColumn:{
            foreignKeyConstraintName: 'parent_student_fk',
            name:  'parent_id',
            referencedColumnName: 'id'
        },
        joinColumn: {
            foreignKeyConstraintName: 'student_parent_fk',
            name: 'student_id',
            referencedColumnName: 'id'
        },
        
    })
    parents: ParentEntity[] ;

    @ManyToOne(() => ClassEntity, schoolGroup => schoolGroup.students)
    @JoinColumn({
        foreignKeyConstraintName: 'fk_student_class',
        name: 'student_id',
        referencedColumnName: 'id'
    })
    schoolGroup: ClassEntity;

    static toStudentEntity(student: Student): StudentEntity{
        let model = new StudentEntity();
        model.birthday = student.getBirthday();
        model.createdAt = student.getCreatedAt();
        model.deletedAt = student.getDeletedAt();
        model.updatedAt = student.getUpdatedAt();
        model.enrolled = student.getEnrolled();
        model.fullName = student.getName();
        model.id = student.getId();
        model.parents = this.toParentEntity(student.getParents())
        model.schoolGroup = ClassEntity.toClassEntity(student.getSchoolGroup());
        return model;
    }

    private static toParentEntity(parents: Parent[]): ParentEntity[]{
        
        if(parents.length == 0){
            throw new Error('should inform at least one parent')
        }
        let parentsModel : ParentEntity[] = [];
        parents.forEach(it => {
            let model = new ParentEntity();
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

    static toStudentsEntities(students: Student[]): StudentEntity[]{
        let models : StudentEntity[] = [];
        students.forEach(it =>{
            let s = this.toStudentEntity(it);
            models.push(s);
        })
        return models;
    }
}