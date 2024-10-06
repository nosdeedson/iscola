export class FindAcademicSemesterDto{

    actual: boolean;
    beginningDate: Date;
    endingDate: Date;


    constructor(actual: boolean, beginningDate: Date, endingDate){
        this.actual = actual;
        this.beginningDate = beginningDate;
        this.endingDate = endingDate;
    }

}