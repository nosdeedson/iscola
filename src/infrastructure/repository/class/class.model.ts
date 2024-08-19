import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { WokerModel } from "../worker/woker.model";
import { StudentModel } from "../student/student.model";
import { Student } from "src/domain/student/student";

@Entity('class')
export class ClassModel extends GenericModel {

    @Column({
        nullable: false,
        name: 'class_code'
    })
    classCode: string;
    
    @Column({
        nullable: false,
        name: 'class_name'
    })
    className: string;

    @Column({
        nullable: false,
        name: 'book_name'
    })
    bookName: string;

    @Column({
        nullable: false,
        name: 'first_day_of_class_in_week'
    })
    firstDayOfClassInWeek: string;
    
    @Column({
        nullable: false,
        name: 'second_day_of_class_in_week'
    })
    secondDayOfClassInWeek: string;
    
    @Column({
        nullable: false,
        name: 'time_first_day'
    })
    timeFirstDay: string;

    @Column({
        nullable: false,
        name: 'time_second_day'
    })
    timeSecondDay: string;

    @OneToMany(() => StudentModel, student => student.schoolGroup)
    students: StudentModel[];

    @ManyToOne(() => WokerModel, (teacher) => teacher.classes)
    teacher: WokerModel;

}