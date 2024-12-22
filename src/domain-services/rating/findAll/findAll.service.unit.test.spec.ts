
import { MockRepositoriesForUnitTest } from '../../../infrastructure/__mocks__/mockRepositories';
import { DomainMocks } from '../../../infrastructure/__mocks__/mocks';
import { FindAllRatingService } from './findAll.rating.service';
import { RatingEntity } from '../../../infrastructure/entities/rating/rating.entity';

describe('find all rating unit tests', () =>{

    it('should find an empty array', async () =>{
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();
        ratingRepository.findAll = jest.fn().mockImplementationOnce(() => {return []})
        const service = new FindAllRatingService(ratingRepository);
        let results = await service.execute();
        expect(results.all.length).toBe(0)
    })

    it('should find all rating', async () =>{
        let rating = DomainMocks.mockRating();
        let entity = RatingEntity.toRatingEntity(rating);
        const ratingRepository = MockRepositoriesForUnitTest.mockRepositories();

        ratingRepository.findAll = jest.fn().mockImplementationOnce(() => {return [entity]})
        const service = new FindAllRatingService(ratingRepository);
        let results = await service.execute();
        expect(results.all.length).toBe(1)
        expect(results.all[0].id).toBe(rating.getId());
    })

})