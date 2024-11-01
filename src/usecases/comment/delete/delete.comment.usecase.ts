import { CommentRepositoryInterface } from "src/domain/comment/comment.repository.interface";

export class DeleteCommentUseCase{

    private commentRepository: CommentRepositoryInterface;

    constructor( commentRepository: CommentRepositoryInterface){
        this.commentRepository = commentRepository;
    }

    async execute(idComment: string){
        await this.commentRepository.delete(idComment);
    }
}