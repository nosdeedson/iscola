export class CreateCommentDto{

    comment: string;
    idPersonHaveDone: string;
    idRating: string;
    
    constructor(
        comment: string,
        idPersonHaveDone: string,
        idRating: string
    ){
        this.comment = comment;
        this.idPersonHaveDone = idPersonHaveDone;
        this.idRating = idRating;
    }

}