import { StudentEntity } from "src/infrastructure/entities/student/student.entity";

export class FindStutendDto{
    createdAt: Date;
    deletedAt: Date;
    enrolled: string;
    id: string;
    name: string;
    parentsIds: string[] = [];
    schoolGroupId: string;

    constructor(student: StudentEntity){
        this.createdAt = student.createdAt;
        this.deletedAt = student.deletedAt;
        this.enrolled = student.enrolled;
        this.id = student.id;
        this.name = student.fullName;
        if(student?.parents?.length > 0){
            student.parents.forEach(it => {
                this.parentsIds.push(it.id);
            })
        }
        this.schoolGroupId = student?.schoolGroup?.id;
    }
}