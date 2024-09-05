import { Comment } from "../../../domain/comment/comment";
import { Rating } from "../../../domain/rating/rating";
import { RatingEntity } from "../rating/rating.entity";
import { CommentEntity } from "./comment.entity";



jest.mock('../../../domain/rating/rating')

describe("CommentModel unit tests", () => {

    let comment;
    let comment1;
    let comments: Comment[] = [];
    let rating: Rating;
    let ratingModel: RatingEntity;
    
    beforeEach(() =>{
        ratingModel = new RatingEntity();
        comment = new Comment("comment", '123', new Date());
        comment1 = new Comment("comment1", '123', new Date());
        comments.push(comment)
        comments.push(comment1)
    })

    it('should instantiate a comment from Comment domain', () => {
        
        const model = CommentEntity.toCommentModel(comment, ratingModel);

        expect(model).toBeDefined();
        expect(model.comment).toEqual(comment.getComment());
        expect(model.commentDate).toEqual(comment.getCommentDate());
        expect(model.createdAt).toEqual(comment.getCreatedAt());
        expect(model.deletedAt).toEqual(comment.getDeletedAt());
        expect(model.id).toEqual(comment.getId());
        expect(model.idPersonHaveDone).toEqual(comment.getIdPersonHadDone());
        // expect(model.rantig).toEqual(comment.getRating());
        expect(model.updatedAt).toEqual(comment.getUpdatedAt());
    })
})