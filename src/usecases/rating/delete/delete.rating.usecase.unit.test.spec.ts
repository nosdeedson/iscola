import { MockRepositoriesForUnitTest } from "../../../infrastructure/__mocks__/mockRepositories";
import { DomainMocks } from "../../../infrastructure/__mocks__/mocks";
import { DeleteRatingUseCase } from '../delete/delete.rating.usecase';

describe('DeleteRating service unit tests', () =>{

    it('should not thorw an error while trying to deleting a rating', async () => {
        let rating = DomainMocks.mockRating();
        
        let ratingRepository = MockRepositoriesForUnitTest.mockRepositories();

        ratingRepository.delete = jest.fn().mockImplementationOnce(() => { return void 0});

        const usecase = new DeleteRatingUseCase(ratingRepository);
        expect(await usecase.execute('123')).toBe(void 0);
        expect(ratingRepository.delete).toHaveBeenCalledTimes(1);
        expect(ratingRepository.delete).toHaveBeenCalledWith('123')

    });

    it('should delete a rating', async () => {
        let rating = DomainMocks.mockRating();
        
        let ratingRepository = MockRepositoriesForUnitTest.mockRepositories();

        ratingRepository.delete = jest.fn().mockImplementationOnce(() => { return void 0});

        const usecase = new DeleteRatingUseCase(ratingRepository);
        expect(await usecase.execute(rating.getId())).toBe(void 0);
        expect(ratingRepository.delete).toHaveBeenCalledTimes(1);
        expect(ratingRepository.delete).toHaveBeenCalledWith(rating.getId());

    });

})