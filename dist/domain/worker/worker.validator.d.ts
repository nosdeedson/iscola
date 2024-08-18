import { Validator } from "../@shared/validation/validator.interface";
import { Worker } from './worker';
export declare class TeacherValidator implements Validator<Worker> {
    validate(entity: Worker): void;
}
