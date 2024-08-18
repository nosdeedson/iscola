import { Entity } from "../@shared/entity";
export declare class Period extends Entity {
    actual: boolean;
    beginningDate: Date;
    endingDate: Date;
    constructor(actual: boolean, beginningDate: Date, endingDate: Date, id?: string, createdAt?: Date, updatedAt?: Date, deletedAt?: Date);
    validate(): void;
    getActual(): boolean;
    getBeginningDate(): Date;
    getEndingDate(): Date;
}
