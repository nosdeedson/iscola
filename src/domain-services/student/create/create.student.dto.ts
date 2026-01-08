
export class CreateStudentDto{

    birthday: Date;
    name: string;
    enrolled: string;
    parentsName: string[] = [];

    constructor(
        birthday: Date,
        name: string,
        enrolled: string,
        parentsName: string[],
    ){
        this.birthday = birthday;
        this.name = name;
        this.enrolled = enrolled;
        this.parentsName = parentsName;
    }

}