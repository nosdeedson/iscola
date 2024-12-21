import { RatingRepositoryInterface } from "src/domain/rating/rating.repository.interface";
import { UpdateRatingDto } from "./udpate.rating.dto";
import { Entity } from "typeorm";
import { SystemError } from "src/usecases/@shared/system-error";

export class UpdateRatingService{

    private ratingRepository: RatingRepositoryInterface;

    constructor(ratingRepository: RatingRepositoryInterface){
        this.ratingRepository = ratingRepository;
    }

    async execute(dto: UpdateRatingDto) {
        try {
            let entity = await this.ratingRepository.find(dto.id);
            if(!entity){
                throw new SystemError([{context: 'rating', message: 'Not found'}]);
            }
            entity = dto.updateEntity(entity);
            await this.ratingRepository.update(entity);
        } catch (error) {
            throw error;
        }
    }
}