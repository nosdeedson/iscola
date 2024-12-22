import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { FindCommentService } from './find.comment.service';
import { CommentEntity } from '../../../infrastructure/entities/comment/comment.entity';
import { RatingEntity } from '../../../infrastructure/entities/rating/rating.entity';


describe('FindCommentService unit tests', () =>{

    it('given an non-existent id should return null', async () => {
        const commentRepository = MockRepositoriesForUnitTest.mockRepositories();
        commentRepository.find = jest.fn()
            .mockImplementationOnce( () =>{
                return null;
            });
        const service = new FindCommentService(commentRepository);

        const wantedId = '1234';
        try {
            const result = await service.execute(wantedId);
        } catch (error) {
            expect(error.errors).toBeDefined();
            expect(error.errors).toMatchObject([{context: 'comment', message: 'comment not found'}]);
            expect(error.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({context: 'comment'}),
                    expect.objectContaining({message: 'comment not found'})
                ]),
            );
            expect(error.errors[0]).toEqual(
                expect.objectContaining({context: 'comment'})
            )
            expect(error.errors[0]).toEqual(
                expect.objectContaining({message: 'comment not found'})
            )
            expect(commentRepository.find).toHaveBeenCalledTimes(1);
            expect(commentRepository.find).toHaveBeenCalledWith(wantedId);
        }
    });

    it('should find a comment', async () =>{
        const comment = DomainMocks.mockComment();
        const rating = DomainMocks.mockRating();
        const ratingEntity = RatingEntity.toRatingEntity(rating);
        const entity = CommentEntity.toCommentEntity(comment, ratingEntity);
        
        const commentRepository = MockRepositoriesForUnitTest.mockRepositories();
        commentRepository.find = jest.fn().mockImplementationOnce( () =>{
            return entity;
        });

        const wantedId = comment.getId();
        const service = new FindCommentService(commentRepository);
        const result = await service.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.idComment).toBe(wantedId);
        expect(result.comment).toBe(comment.getComment());
        expect(result.createdAt).toBe(comment.getCreatedAt());
        expect(result.idPersonHadDone).toBe(comment.getIdPersonHadDone());
        expect(commentRepository.find).toHaveBeenCalledTimes(1);
        expect(commentRepository.find).toHaveBeenCalledWith(wantedId);
    })

})