import { Column, Entity } from "typeorm";
import { GenericModel } from "../@shared/generis.model/generic.model.interface";

@Entity('class')
export class Class extends GenericModel {

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
        name: 'time'
    })
    time: string;

}