import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories"
import { CreateCommentUseCase } from './create.comment.usecase';
import { CreateCommentDto } from './create.comment.dto';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { RatingEntity } from "../../../infrastructure/entities/rating/rating.entity";
import { Entity } from "typeorm";

describe('create comment use case unit test', () =>{

    it('should throw SystemError with Rating not found', async () =>{
        const commentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        
        const dto = new CreateCommentDto('test a test', '0e2189bd-8f47-4665-90b3-53191b52e606', new Date(), "55c63535-25f8-471e-8184-d1f1d44a042c");

        const usecase = new CreateCommentUseCase(commentRepository,ratingRepository);
        try {
            expect(await usecase.execute(dto)).toBe(void 0);
        } catch (error) {      
            expect(error).toBeDefined();
            expect(error.errors).toMatchObject( [{
                "context": "comment",
                "message": "Rating not found",
              }]);
            expect(ratingRepository.find).toHaveBeenCalledTimes(1);
        }
    })

    it('should create a comment', async () =>{

        let rating = DomainMocks.mockRating();
        let entity = RatingEntity.toRatingEntity(rating);

        const commentRepository = MockRepositoriesForUnitTest.mockRepositories();
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        ratingRepository.find = jest.fn()
            .mockImplementationOnce(() => {
                return entity
            })
        
        const dto = new CreateCommentDto('test a test', '0e2189bd-8f47-4665-90b3-53191b52e606', new Date(), rating.getId());

        const usecase = new CreateCommentUseCase(commentRepository,ratingRepository);
        expect(await usecase.execute(dto)).toBe(void 0);
        expect(commentRepository.create).toHaveBeenCalledTimes(1);
        expect(ratingRepository.find).toHaveBeenCalledTimes(1);

    })

})