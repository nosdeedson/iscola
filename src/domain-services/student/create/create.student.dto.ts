
export class CreateStudentDto{

    birthday: Date;
    name: string;
    enrolled: string;
    parentsId: string[] = [];

    constructor(
        birthday: Date,
        name: string,
        enrolled: string,
        parentsId: string[],
    ){
        this.birthday = birthday;
        this.name = name;
        this.enrolled = enrolled;
        this.parentsId = parentsId;
    }

}