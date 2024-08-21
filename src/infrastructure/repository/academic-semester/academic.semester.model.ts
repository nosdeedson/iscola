import { AcademicSemester } from "src/domain/academc-semester/academic.semester";
import { Column, Entity, OneToMany } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { RatingModel } from "../rating/rating.model";


@Entity("academic_semester")
export class AcademicSemesterModel extends GenericModel {

    private constructor() { super() }

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

    static toAcademicSemester(semester: AcademicSemester): AcademicSemesterModel {
        let model = new AcademicSemesterModel();
        model.actual = semester.getActual();
        model.beginningDate = semester.getBeginningDate();
        model.createdAt = semester.getCreatedAt();
        model.deletedAt = semester.getDeletedAt();
        model.endingDate = semester.getEndingDate();
        model.id = semester.getId();
        model.updatedAt = semester.getUpdatedAt()
        model.ratings = RatingModel.toRatingsModels(semester.getRating());

        return model;
    }

}