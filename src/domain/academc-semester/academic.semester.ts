import { Entity } from "../@shared/entity";
import { Rating } from "../rating/rating";
import { PeriodValidator } from "./academic.semester.validator";

export class AcademicSemester extends Entity {

    private actual: boolean;
    private beginningDate: Date;
    private endingDate: Date;
    private ratings?: Rating[];

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

    setActual(actual: boolean){
        this.actual = actual;
    }

    getBeginningDate(): Date{
        return this.beginningDate;
    }

    setBeginningDate(date: Date){
        this.beginningDate = date;
    }

    getEndingDate(): Date{
        return this.endingDate;
    }

    setEndingDate(date: Date){
        this.endingDate = date;
    }

    getRating(): Rating[]{
        return this.ratings;
    }

    setRating(rating: Rating){
        if(!this.ratings){
            this.ratings = [];
        }
        this.ratings.push(rating);
    }
}