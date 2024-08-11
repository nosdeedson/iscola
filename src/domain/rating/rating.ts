import { Period } from "../period/period";
import { Entity } from "../@shared/entity";
import { Grade } from "../enum/grade/grade";
import { Student } from "../student/student";
import { RatingValidator } from '../rating/rating.validator'
import { Comment } from "../comment/comment";

export class Rating extends Entity {

    comments: Comment[];
    period: Period;
    student: Student;
    ratingDate: Date;
    listing: Grade;
    writing: Grade;
    reading: Grade;
    speaking: Grade;
    grammar: Grade;
    homework: Grade;
    vocabulary: Grade;

    constructor(
        period: Period,
        student: Student,
        ratingDate: Date,
        listing: Grade,
        writing: Grade,
        reading: Grade,
        speaking: Grade,
        grammar: Grade,
        homework: Grade,
        vocabulary: Grade,
        id?: string, 
        createdAt?: Date, 
        updatedAt?: Date, 
        deletedAt?: Date
    ){
        super(id, createdAt, updatedAt, deletedAt);
        this.period = period;
        this.student = student;
        this.ratingDate = ratingDate;
        this.listing = listing;
        this.writing = writing;
        this.reading = reading;
        this.speaking = speaking;
        this.grammar = grammar;
        this.homework = homework;
        this.vocabulary = vocabulary;
        this.validate();
    }

    validate() {
        new RatingValidator().validate(this);
    }

    getComments(): Comment[]{
        return this.comments;
    }

    setComments(comment: Comment) {
        if(!this.comments){
            this.comments = [];
        }
        this.comments.push(comment)
    }
    getPeriod(): Period{
        return this.period;
    }

    getStudent(): Student{
        return this.student;
    }

    getRatingDate(): Date{
        return this.ratingDate;
    }

    getListing(): Grade{
        return this.listing;
    }

    getWriting(): Grade{
        return this.writing;
    }

    getReading(): Grade{
        return this.reading;
    }

    getSpeaking(): Grade{
        return this.speaking
    } 

    getGrammar(): Grade{
        return this.grammar;
    }

    getHomework(): Grade{
        return this.homework;
    }

    getVocabulary(): Grade{
        return this.vocabulary;
    }
    
}