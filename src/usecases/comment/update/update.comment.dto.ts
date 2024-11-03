export class UpdateCommentDto{
    
    idComment: string;
    comment: string;

    constructor(
        idComment: string,
        comment: string
    ){
        this.idComment = idComment;
        this.comment = comment;
    }
}