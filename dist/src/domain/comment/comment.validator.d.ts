import { Validator } from '../@shared/validation/validator.interface';
import { Comment } from './comment';
export declare class CommentValidator implements Validator<Comment> {
    validate(entity: Comment): void;
}
