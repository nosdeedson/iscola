
export class CreateStudentDto{

    birthday: Date;
    name: string;
    enrolled: string;
    parentsId: string[] = [];
    schoolGroupId: string;

    constructor(
        birthday: Date,
        name: string,
        enrolled: string,
        parentsId: string[],
        schoolGroupId: string
    ){
        this.birthday = birthday;
        this.name = name;
        this.enrolled = enrolled;
        this.parentsId = parentsId;
        this.schoolGroupId = schoolGroupId;
    }

}