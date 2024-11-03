import { CommentRepositoryInterface } from "src/domain/comment/comment.repository.interface";
import { FindAllCommentDto } from "./findAll.comment.dto";

export class FindAllCommentUseCase {

    private commentRepositoy: CommentRepositoryInterface;

    constructor(commentRepositoy: CommentRepositoryInterface){
        this.commentRepositoy = commentRepositoy;
    }

    async execute(): Promise<FindAllCommentDto>{
        const results = await this.commentRepositoy.findAll();
        const dtos = new FindAllCommentDto(results);
        return dtos;
    }
}