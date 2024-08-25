import { Rating } from "../../../domain/rating/rating";
import { Comment } from "../../../domain/comment/comment";
import { RatingModel } from "../rating/rating.model";
import { CommentModel } from "./comment.model";
import { AcademicSemester } from "../../../domain/academc-semester/academic.semester";

jest.mock('../../../domain/rating/rating')

describe("CommentModel unit tests", () => {

    let comment;
    let comment1;
    let comments: Comment[] = [];
    let rating: Rating;
    
    beforeEach(() =>{
        let academicSemester = new AcademicSemester(false, null, null)
        rating = new Rating(academicSemester, null, null,null, null, null,null, null, null,null, null)
        
        comment = new Comment("comment", '123', new Date());
        comment.setRating([rating]);
        comment1 = new Comment("comment1", '123', new Date());
        comment1.setRating([rating])
        comments.push(comment)
        comments.push(comment1)
    })

    it('should instantiate a comment from Comment domain', () => {
        
        const ratingModelFile = jest.spyOn(RatingModel, 'toRatingModel');
        const ratingFile = jest.spyOn(Rating.prototype, 'getAcademicSemester');
        const model = CommentModel.toCommentModel(comment);

        expect(model).toBeDefined();
        expect(model.comment).toEqual(comment.getComment());
        expect(model.commentDate).toEqual(comment.getCommentDate());
        expect(model.createdAt).toEqual(comment.getCreatedAt());
        expect(model.deletedAt).toEqual(comment.getDeletedAt());
        expect(model.id).toEqual(comment.getId());
        expect(model.idPersonHaveDone).toEqual(comment.getIdPersonHadDone());
        expect(model.rantig).toEqual(comment.getRating());
        expect(model.updatedAt).toEqual(comment.getUpdatedAt());
        expect(ratingModelFile).toHaveBeenCalled()
        expect(ratingModelFile).toHaveBeenCalledTimes(1)
    })
})