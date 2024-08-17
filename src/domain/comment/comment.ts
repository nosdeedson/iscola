import { number } from "yup";
import { Entity } from "../@shared/entity";
import { CommentValidator } from "./comment.validator";

export class Comment extends Entity {
    private comment: string;
    private idPersonHadDone: number;
    private commentDate: Date;

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

    setComment(comment: string){
        this.comment = comment;
    }

    getIdPersonHadDone(): number{
        return this.idPersonHadDone
    }

    setIdPersonHadDone(id: number){
       this.idPersonHadDone = id;
    }

    getCommentDate(): Date{
        return this.commentDate;
    }

    setCommentDate(date: Date){
        this.commentDate = date;
    }
}