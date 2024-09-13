import { Parent } from "../parent/parent";
import { Person } from "../@shared/person";
import { StudentValidator } from "./student.validator";
import { Rating } from "../rating/rating";
import { Class } from "../class/class";

export class Student extends Person {
    // TODO create code to generate enrolled code

    private enrolled: string;
    private parents: Parent[];
    private ratings: Rating[];
    private schoolGroup: Class;

    constructor(
        birthday: Date,
        name: string,
        enrolled: string,
        parents?: Parent[],
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    ) {
        super(birthday, name,
            id, 
            createdAt, 
            updatedAt, 
            deletedAt)
        this.enrolled = enrolled;
        this.parents = parents;
        this.validate()
    }

    validate(): void{
        new StudentValidator().validate(this);
    }

    getParents(): Parent[] {
        return this.parents
    }

    setParents(parent: Parent){
        if(!this.parents){
            this.parents = [];
        }
        this.parents.push(parent);
    }


    getEnrolled(): string {
        return this.enrolled;
    }

    getRating(): Rating[]{
        return this.ratings;
    }

    getSchoolGroup(): Class{
        return this.schoolGroup;
    }

    setSchoolGroup(schoolGroup: Class){
        this.schoolGroup = schoolGroup;
    }

}