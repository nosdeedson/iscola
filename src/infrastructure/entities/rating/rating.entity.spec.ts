import { Rating } from "../../../domain/rating/rating"
import { RatingEntity } from "./rating.entity"
import { DomainMocks } from "../../__mocks__/mocks";

describe('RatingModel test units', () =>{

    let rating : Rating;
    let rating1 : Rating;
    let ratings : Rating[];

    beforeEach(() => {
        rating = DomainMocks.mockRating();
        rating1 = DomainMocks.mockRating();
        ratings = [];
        ratings.push(rating);
        ratings.push(rating1)
    })

    it('should instantiate a RatingModel', () => {

        let model = RatingEntity.toRatingEntity(rating);
        expect(model.id).toBeDefined();
        expect(model.createdAt).toBeDefined();
        expect(model.deletedAt).toBeUndefined();
        expect(model.updatedAt).toBeDefined();
        expect(model.grammar).toBeDefined();
        expect(model.homework).toBeDefined();
        expect(model.listing).toBeDefined();
        expect(model.ratingDate).toBeDefined();
        expect(model.reading).toBeDefined();
        expect(model.speaking).toBeDefined();
        expect(model.vocabulary).toBeDefined();
        expect(model.writing).toBeDefined();
        expect(model.comments).toBeUndefined();
        expect(model.student).toBeDefined();
        expect(model.academicSemester).toBeDefined();
    });

    it('should convert an array of Rating to RatingModel', () =>{
        let models = RatingEntity.toRatingsEntity(ratings);
        expect(models).toBeDefined();
        expect(models.length).toBe(2);
        expect(models[0].id).toStrictEqual(rating.getId());
        expect(models[1].id).toStrictEqual(rating1.getId());
    })

})