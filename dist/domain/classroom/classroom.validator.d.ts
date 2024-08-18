import { Validator } from "../@shared/validation/validator.interface";
import { Classroom } from "./classroom";
export declare class ClassroomValidator implements Validator<Classroom> {
    validate(entity: Classroom): void;
}
