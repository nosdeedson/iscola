import { Rating } from "src/domain/rating/rating";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Grade } from "../../../domain/enum/grade/grade";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { AcademicSemesterModel } from "../academic-semester/academic.semester.model";
import { CommentModel } from "../comment/comment.model";
import { StudentModel } from "../student/student.model";


@Entity('rating')
export class RatingModel extends GenericModel {

    constructor() { super() }

    @Column({
        nullable: false,
        name: 'grammar',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    grammar: Grade;

    @Column({
        nullable: false,
        name: 'homework',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    homework: Grade;

    @Column({
        nullable: false,
        name: 'listining',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    listing: Grade;

    @Column({
        nullable: false,
        name: 'rating_date',
        type: 'timestamp with time zone'
    })
    ratingDate: Date;

    @Column({
        nullable: false,
        name: 'reading',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    reading: Grade;

    @Column({
        nullable: false,
        name: 'speaking',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    speaking: Grade;

    @Column({
        nullable: false,
        name: 'vocabulary',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    vocabulary: Grade;

    @Column({
        nullable: false,
        name: 'writing',
        type: 'enum',
        enum: [
            Grade.BAD,
            Grade.EXCELENT,
            Grade.GOOD,
            Grade.REGULAR,
            Grade.VERY_GOOD,
        ]
    })
    writing: Grade;

    @JoinColumn({
        name: 'academic_semester_id',
        foreignKeyConstraintName: 'fk_academic_semester',
        referencedColumnName: 'id'
    })
    @ManyToOne(() => AcademicSemesterModel, academicSemester => academicSemester.ratings)
    academicSemester: AcademicSemesterModel;

    @OneToMany(() => CommentModel, comment => comment.rantig)
    comments: CommentModel[];

    @ManyToOne(() => StudentModel)
    @JoinColumn({
        name: 'student_id',
        foreignKeyConstraintName: 'fk_student_id'
    })
    student: StudentModel;

    static toRatingModel(rating: Rating): RatingModel {
        let model = new RatingModel();
        let c = rating.getComments();
        model.comments = CommentModel.toCommentsModels(c, rating)
        model.createdAt = rating.getCreatedAt();
        model.deletedAt = rating.getDeletedAt();
        model.grammar = rating.getGrammar();
        model.homework = rating.getHomework();
        model.id = rating.getId();
        model.listing = rating.getListing();
        model.ratingDate = rating.getRatingDate();
        model.reading = rating.getReading();
        model.speaking = rating.getSpeaking();
        model.student = StudentModel.toStudentModel(rating.getStudent());
        model.updatedAt = rating.getUpdatedAt();
        model.vocabulary = rating.getVocabulary();
        model.writing = rating.getWriting();
        model.academicSemester = AcademicSemesterModel.toAcademicSemester(rating.getAcademicSemester());
        return model;
    }

    static toRatingsModels(ratings: Rating[]): RatingModel[] {
        if (!ratings) {
            return undefined
        }
        return ratings.map(it => this.toRatingModel(it));
    }

}