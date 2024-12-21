import { RatingRepositoryInterface } from "src/domain/rating/rating.repository.interface";

export class DeleteRatingUseCase{

    private ratingRepository: RatingRepositoryInterface;

    constructor(ratingRepository: RatingRepositoryInterface){
        this.ratingRepository = ratingRepository;
    }

    async execute(id: string){
        try {
            await this.ratingRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}