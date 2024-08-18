import { Student } from "./student";
import { Validator } from '../@shared/validation/validator.interface';
export declare class StudentValidator implements Validator<Student> {
    validate(entity: Student): void;
}
