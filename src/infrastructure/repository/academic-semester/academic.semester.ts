import { Column, Entity, OneToMany } from "typeorm";
import { GenericModel } from "../@shared/generis.model/generic.model";
import { RatingModel } from "../rating/rating";


@Entity('academic_semester')
export class AcademicSemesterModel extends GenericModel {

    actual: boolean;

    @Column({
        nullable: false,
        name: 'beginning_date'
    })
    beginningDate: Date;

    @Column({
        nullable: false,
        name: 'beginning_date'
    })
    endingDate: Date;

    @OneToMany(() => RatingModel, rating => rating.academicSemester)
    ratings: RatingModel[];
}