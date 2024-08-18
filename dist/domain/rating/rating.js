"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const entity_1 = require("../@shared/entity");
const rating_validator_1 = require("../rating/rating.validator");
class Rating extends entity_1.Entity {
    constructor(period, student, ratingDate, listing, writing, reading, speaking, grammar, homework, vocabulary, id, createdAt, updatedAt, deletedAt) {
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
        new rating_validator_1.RatingValidator().validate(this);
    }
    getComments() {
        return this.comments;
    }
    setComments(comment) {
        if (!this.comments) {
            this.comments = [];
        }
        this.comments.push(comment);
    }
    getPeriod() {
        return this.period;
    }
    getStudent() {
        return this.student;
    }
    getRatingDate() {
        return this.ratingDate;
    }
    getListing() {
        return this.listing;
    }
    getWriting() {
        return this.writing;
    }
    getReading() {
        return this.reading;
    }
    getSpeaking() {
        return this.speaking;
    }
    getGrammar() {
        return this.grammar;
    }
    getHomework() {
        return this.homework;
    }
    getVocabulary() {
        return this.vocabulary;
    }
}
exports.Rating = Rating;
//# sourceMappingURL=rating.js.map