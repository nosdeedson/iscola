export class FindAcademicSemesterDto {

    id: string;
    actual: boolean;
    beginningDate: Date;
    endingDate: Date;


    constructor(id: string, actual: boolean, beginningDate: Date, endingDate: Date) {
        this.id = id;
        this.actual = actual;
        this.beginningDate = beginningDate;
        this.endingDate = endingDate;
    }

}