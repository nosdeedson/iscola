import { Validator } from '../@shared/validation/validator.interface';
import { User } from '../user/user';
export declare class UserValidator implements Validator<User> {
    validate(entity: User): void;
}
