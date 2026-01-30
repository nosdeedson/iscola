import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ParentEntity } from "../parent/parent.entity";
import { StudentEntity } from "../student/student.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity("parent_student")
export class ParentStudentEntity  {

    @PrimaryColumn({ type: 'uuid', unique: true})
    id: string;

    @ManyToOne(() => ParentEntity, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'parent_id'})
    parent: ParentEntity;

    @Column({name: 'parent_id', type: 'uuid'})
    parentId: string;

    @ManyToOne(() => StudentEntity, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'student_id'})
    student: StudentEntity;

    @Column({name: 'student_id', type: 'uuid'})
    studentId: string;

    static toParentStudentEntity(parent: ParentEntity, student: StudentEntity): ParentStudentEntity {
        const ps = new ParentStudentEntity();
        ps.id = uuidv4().toString() as string;
        ps.parent = parent;
        ps.student = student;
        return ps;
    }
    
}