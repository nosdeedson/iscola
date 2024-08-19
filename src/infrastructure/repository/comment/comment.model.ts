import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { RatingModel } from "../rating/rating";


@Entity('comment')
export class CommentModel extends GenericModel {

    @Column({
        nullable: false,
        name: 'comment',
        type: 'varchar',
        length: 500
    })
    comment: string;

    @Column({
        nullable: false,
        name: 'comment_date',
        type: 'timestamp with time zone'
    })
    commentDate: Date;

    @Column({
        nullable: false,
        name: 'id_person_have_done',
        type: 'string'
    })
    idPersonHaveDone: string;

    @JoinColumn({
        name: 'rating_id'
    })
    @ManyToOne(() => RatingModel, rating => rating.comments)
    rantig: RatingModel;

}