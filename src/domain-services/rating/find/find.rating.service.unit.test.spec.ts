import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { FindRatingService } from "./find.rating.service";
import { RatingEntity} from '../../../infrastructure/entities/rating/rating.entity';

describe('find rating unit tests', () =>{

    it('should throw a systemError', async () =>{
        let ratingRepository = MockRepositoriesForUnitTest.mockRepositories();

        ratingRepository.find = jest.fn().mockImplementationOnce(() => { return null});
        try {
            const service = new FindRatingService(ratingRepository);
            let result = await service.execute('123');
        } catch (error) {   
            expect(error).toBeDefined();
            //@ts-ignore
            expect(error.errors).toMatchObject([{context: 'rating', message: 'Not found'}])
            expect(ratingRepository.find).toHaveBeenCalledTimes(1);
            expect(ratingRepository.find).toHaveBeenCalledWith('123')
        }
    });

    it('should find a rating', async () =>{
        let rating = DomainMocks.mockRating();   
        let entity = RatingEntity.toRatingEntity(rating);     
        let ratingRepository = MockRepositoriesForUnitTest.mockRepositories();

        ratingRepository.find = jest.fn().mockImplementationOnce(() => { return entity});

        const service = new FindRatingService(ratingRepository);
        const wantedId = rating.getId();
        let result = await service.execute(wantedId);
        expect(result).toBeDefined();
        expect(result.id).toBe(rating.getId());
    } )

})