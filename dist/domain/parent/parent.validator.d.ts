import { Validator } from "../@shared/validation/validator.interface";
import { Parent } from "./parent";
export declare class ParentValidator implements Validator<Parent> {
    validate(entity: Parent): void;
}
