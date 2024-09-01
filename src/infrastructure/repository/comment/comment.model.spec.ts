import { Comment } from "../../../domain/comment/comment";
import { Rating } from "../../../domain/rating/rating";
import { RatingModel } from "../rating/rating.model";
import { CommentModel } from "./comment.model";



jest.mock('../../../domain/rating/rating')

describe("CommentModel unit tests", () => {

    let comment;
    let comment1;
    let comments: Comment[] = [];
    let rating: Rating;
    let ratingModel: RatingModel;
    
    beforeEach(() =>{
        ratingModel = new RatingModel();
        comment = new Comment("comment", '123', new Date());
        comment1 = new Comment("comment1", '123', new Date());
        comments.push(comment)
        comments.push(comment1)
    })

    it('should instantiate a comment from Comment domain', () => {
        
        const model = CommentModel.toCommentModel(comment, ratingModel);

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