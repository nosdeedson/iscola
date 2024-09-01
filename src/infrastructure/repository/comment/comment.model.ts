import { Comment } from "src/domain/comment/comment";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { RatingModel } from "../rating/rating.model";


@Entity('comment')
export class CommentModel extends GenericModel {

    private constructor() { super() }

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
        type: 'varchar',
        length: 40
    })
    idPersonHaveDone: string;

    @JoinColumn({
        name: 'rating_id'
    })
    @ManyToOne(() => RatingModel, rating => rating.comments)
    rantig: RatingModel;

    static toCommentModel(comment: Comment, rating: RatingModel): CommentModel {
        let model = new CommentModel();
        model.comment = comment.getComment();
        model.commentDate = comment.getCommentDate();
        model.createdAt = comment.getCreatedAt();
        model.deletedAt = comment.getDeletedAt();
        model.updatedAt = comment.getUpdatedAt();
        model.id = comment.getId();
        model.idPersonHaveDone = comment.getIdPersonHadDone();
        model.rantig = rating ? rating : null;
        return model;
    }

    static toCommentsModels(comments: Comment[], rating: RatingModel): CommentModel[] {
        let models : CommentModel[] = []
        comments.forEach(it => {
            models.push(this.toCommentModel(it, rating));
        })
        return models;
    }
}