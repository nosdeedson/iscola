import { RatingRepositoryInterface } from "src/domain/rating/rating.repository.interface";
import { FindRatingDto } from "./find.rating.dto";
import { SystemError } from "src/aplication/services/@shared/system-error";

export class FindRatingService {

    private ratingRepository: RatingRepositoryInterface;

    constructor(ratingRepository: RatingRepositoryInterface){
        this.ratingRepository = ratingRepository;
    }

    async execute(id: string): Promise<FindRatingDto>{
        let result = await this.ratingRepository.find(id);
        if(!result){
            throw new SystemError([{context: 'rating', message: 'Not found'}])
        }
        let dto = new FindRatingDto(result);
        return dto;
    }
}