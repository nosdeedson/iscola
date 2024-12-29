
export class UpdateStudentDto {
    id: string;
    enrolled: string;

    constructor(
        id: string,
        enrolled: string
    ){
        id = id;
        this.enrolled = enrolled;
    }
    
}