import { number } from "yup";
import { Entity } from "../@shared/entity";
import { CommentValidator } from "./comment.validator";
import { Rating } from "../rating/rating";

export class Comment extends Entity {
    private comment: string;
    private idPersonHadDone: string;
    private commentDate: Date;
    private rating: Rating;

    constructor(
        comment: string,
        idPersonHadDone: string,
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

    getIdPersonHadDone(): string{
        return this.idPersonHadDone
    }

    setIdPersonHadDone(id: string){
       this.idPersonHadDone = id;
    }

    getCommentDate(): Date{
        return this.commentDate;
    }

    setCommentDate(date: Date){
        this.commentDate = date;
    }

    getRating(): Rating{
        return this.rating;
    }

    setRating(rating : Rating){
        this.rating = rating;
    }
}