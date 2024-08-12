import { Entity } from "../@shared/entity";
import { PeriodValidator } from "./period.validator";

export class Period extends Entity {

    actual: boolean;
    beginningDate: Date;
    endingDate: Date;

    constructor(
        actual: boolean,
        beginningDate: Date,
        endingDate: Date,
        id?: string, 
        createdAt?: Date, 
        updatedAt?: Date, 
        deletedAt?: Date
    ) {
        super(id, createdAt, updatedAt, deletedAt);
        this.actual = actual;
        this.beginningDate = beginningDate;
        this.endingDate = endingDate;
        this.validate();
    }

    validate(){
        new PeriodValidator().validate(this);
    }

    getActual(): boolean{
        return this.actual
    }

    getBeginningDate(): Date{
        return this.beginningDate;
    }

    getEndingDate(): Date{
        return this.endingDate;
    }

}