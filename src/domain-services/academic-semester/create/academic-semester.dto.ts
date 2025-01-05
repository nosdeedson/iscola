export class InputCreateAcademicSemesterDto {

    beginningDate: Date;
    endingDate: Date;

    constructor(
        beginningDate: Date,
        endingDate: Date
    ) {
        this.beginningDate = beginningDate;
        this.endingDate = endingDate;
    }

}