export class CreateCommentDto{

    comment: string;
    idPersonHaveDone: string;
    commentDate: Date;
    idRating: string;
    
    constructor(
        comment: string,
        idPersonHaveDone: string,
        commentDate: Date,
        idRating: string
    ){
        this.comment = comment;
        this.idPersonHaveDone = idPersonHaveDone;
        this.commentDate = commentDate;
        this.idRating = idRating;
    }

}