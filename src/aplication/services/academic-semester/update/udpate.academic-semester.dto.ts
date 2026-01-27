export class UpdateAcademicSemesterDto{
    id: string;
    actual: boolean;

    constructor(id: string, actual: boolean){
        this.id = id;
        this.actual = actual;
    }
}