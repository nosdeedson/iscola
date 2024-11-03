import { Entity } from "../@shared/entity";
import { CommentValidator } from "./comment.validator";

export class Comment extends Entity {
    private comment: string;
    private idPersonHadDone: string;

    constructor(
        comment: string,
        idPersonHadDone: string,
        id?: string, 
        createdAt?: Date, 
        updatedAt?: Date, 
        deletedAt?: Date
    ) {
        super(id, createdAt, updatedAt, deletedAt);
        this.comment = comment;
        this.idPersonHadDone = idPersonHadDone;
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

    // getRating(): Rating{
    //     return this.rating;
    // }

    // setRating(rating : Rating){
    //     this.rating = rating;
    // }
}