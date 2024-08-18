import { Validator } from '../@shared/validation/validator.interface';
import { Period } from './period';
export declare class PeriodValidator implements Validator<Period> {
    validate(entity: Period): void;
}
