"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grade_1 = require("../enum/grade/grade");
const period_1 = require("../period/period");
const student_1 = require("../student/student");
const rating_1 = require("./rating");
const comment_1 = require("../comment/comment");
describe('Rating unit tests', () => {
    let student;
    let period;
    beforeEach(() => {
        student = new student_1.Student(new Date(), 'jose', '123', []);
        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0);
        period = new period_1.Period(true, aValidBeginnig, aValidEnding);
    });
    it('should instantiate a rating without errors', () => {
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        expect(rating.notification?.getErrors().length).toBe(0);
        expect(rating.getId()).toBeDefined();
        expect(rating.getCreatedAt()).toBeDefined();
        expect(rating.getUpdatedAt()).toBeDefined();
        expect(rating.getDeletedAt()).toBeUndefined();
    });
    it('notification should inform period not defined', () => {
        let period;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: period of rating must be informed,');
    });
    it('notification should inform student not defined', () => {
        let student;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: student receiving rating must be informed,');
    });
    it('notification should inform dateRating not defined', () => {
        let date;
        const rating = new rating_1.Rating(period, student, date, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: rating date must be informed,');
    });
    it('notification should inform listing not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the listining skill must be informed,');
    });
    it('notification should inform writing not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the writing skill must be informed,');
    });
    it('notification should inform reading not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the reading skill must be informed,');
    });
    it('notification should inform speaking not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the speaking skill must be informed,');
    });
    it('notification should inform grammar not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the grammar skill must be informed,');
    });
    it('notification should inform homework not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade, grade_1.Grade.BAD);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the homework commitment must be informed,');
    });
    it('notification should inform homework not defined', () => {
        let grade;
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade);
        expect(rating.notification?.getErrors().length).toBe(1);
        expect(rating.notification?.messages()).toBe('rating: the vocabulary improvment must be informed,');
    });
    it('should have at leat one comment', () => {
        let comment = new comment_1.Comment("comment", 1, new Date());
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        rating.setComments(comment);
        expect(rating).toBeDefined();
        expect(rating.getComments().length).toBe(1);
    });
    it('should get a comment', () => {
        let comment = new comment_1.Comment("comment", 1, new Date());
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        rating.setComments(comment);
        expect(rating).toBeDefined();
        expect(rating.getComments().length).toBe(1);
        const result = rating.getComments()[0];
        expect(result).toEqual(comment);
    });
    it('should get the period', () => {
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getPeriod();
        expect(result).toEqual(period);
    });
    it('should get the period', () => {
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getStudent();
        expect(result).toEqual(student);
    });
    it('should get the student', () => {
        const rating = new rating_1.Rating(period, student, new Date(), grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getStudent();
        expect(result).toEqual(student);
    });
    it('should get the date rating', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getRatingDate();
        expect(result).toEqual(dateRating);
    });
    it('should get the listining skill', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getListing();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
    it('should get the writing skill', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getWriting();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
    it('should get the reading skill', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getReading();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
    it('should get the speaking skill', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getSpeaking();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
    it('should get the grammar skill', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getGrammar();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
    it('should get the homework commitment', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getHomework();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
    it('should get the vocabulary improvment', () => {
        let dateRating = new Date();
        const rating = new rating_1.Rating(period, student, dateRating, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD, grade_1.Grade.BAD);
        expect(rating).toBeDefined();
        const result = rating.getVocabulary();
        expect(result).toEqual(grade_1.Grade.BAD);
    });
});
//# sourceMappingURL=rating.spec.js.map