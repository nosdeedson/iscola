import { Validator } from '../@shared/validation/validator.interface';
import { Rating } from '../rating/rating';
export declare class RatingValidator implements Validator<Rating> {
    validate(entity: Rating): void;
}
