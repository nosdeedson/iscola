import { CommentRepositoryInterface } from "src/domain/comment/comment.repository.interface";
import { UpdateCommentDto } from "./update.comment.dto";
import { SystemError } from "src/usecases/@shared/system-error";

export class UpdateCommentUseCase{
    
    private commentRepository: CommentRepositoryInterface;

    constructor(commentRepository: CommentRepositoryInterface){
        this.commentRepository = commentRepository;
    }

    async execute(dto: UpdateCommentDto){
        const comment = await this.commentRepository.find(dto.idComment);
        if(!comment){
            throw new SystemError([{context: 'comment', message: 'comment not found'}]);
        }
        comment.comment = dto.comment;
        await this.commentRepository.update(comment, dto.idComment);
    }
}