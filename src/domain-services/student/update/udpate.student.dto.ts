import { Rating } from "src/domain/rating/rating";

export class UpdateStudentDto {
    id: string;
    enrolled: string;

    constructor(
        id: string,
        enrolled: string
    ){
        id = id;
        enrolled = enrolled;
    }
    
}