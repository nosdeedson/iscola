import { Entity } from "../@shared/entity";
import { CommentValidator } from "./comment.validator";

export class Comment extends Entity {
    comment: string;
    idPersonHadDone: number;
    commentDate: Date;

    constructor(
        comment: string,
        idPersonHadDone: number,
        commentDate: Date,
        id?: string, 
        createdAt?: Date, 
        updatedAt?: Date, 
        deletedAt?: Date
    ) {
        super(id, createdAt, updatedAt, deletedAt);
        this.comment = comment;
        this.idPersonHadDone = idPersonHadDone;
        this.commentDate = commentDate;
        this.validate();
    }

    validate(){
        new CommentValidator().validate(this);
    }

    getComment(): string{
        return this.comment;
    }

    getIdPersonHadDone(): number{
        return this.idPersonHadDone
    }

    getCommentDate(): Date{
        return this.commentDate;
    }
}