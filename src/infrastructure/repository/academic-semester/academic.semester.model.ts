import { Column, Entity, OneToMany } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { RatingModel } from "../rating/rating";


@Entity("academic_semester")
export class AcademicSemesterModel extends GenericModel {

    @Column({
        nullable: false,
        name: 'actual',
    })
    actual: boolean;

    @Column({
        nullable: false,
        name: 'beginning_date',
        type: 'timestamp with time zone'
    })
    beginningDate: Date;

    @Column({
        nullable: false,
        name: 'ending_date'
    })
    endingDate: Date;

    @OneToMany(() => RatingModel, rating => rating.academicSemester)
    ratings: RatingModel[];
}