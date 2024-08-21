import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { StudentModel } from "../student/student.model";
import { WokerModel } from "../worker/worker.model";
import { Class } from "src/domain/class/class";

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

    static toClassModel(schoolGroup: Class): ClassModel {
        if (!schoolGroup) {
            return null;
        }
        let model = new ClassModel();
        model.bookName = schoolGroup.getNameBook();
        model.classCode = schoolGroup.getClassCode();
        model.className = schoolGroup.getName();
        model.createdAt = schoolGroup.getCreatedAt();
        model.deletedAt = schoolGroup.getDeletedAt();
        model.firstDayOfClassInWeek = schoolGroup.getSchecule().getDayOfWeek()[0];
        model.id = schoolGroup.getId();
        model.secondDayOfClassInWeek = schoolGroup.getSchecule().getDayOfWeek()[1];
        model.students = StudentModel.toStudentsModels(schoolGroup.getStudents());
        model.teacher = WokerModel.toWorkerModel(schoolGroup.getTeacher());
        model.timeFirstDay = schoolGroup.getSchecule().getTimes().get(model.firstDayOfClassInWeek);
        model.timeSecondDay = schoolGroup.getSchecule().getTimes().get(model.secondDayOfClassInWeek);
        model.updatedAt = schoolGroup.getUpdatedAt();
        return model;
    }

    static toClassesModels(classes: Class[]): ClassModel[] {
        let models: ClassModel[] = [];
        classes.forEach(it => {
            let c = this.toClassModel(it);
            models.push(c);
        })
        return models;
    }

    private constructor() { super() }

}