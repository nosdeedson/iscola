import { Grade } from "../enum/grade/grade";
import { AcademicSemester } from "../academc-semester/academic.semester";
import { Student } from "../student/student";
import { Rating } from "./rating";
import { Comment } from "../comment/comment"


describe('Rating unit tests', () => {

    let student;
    let period;

    beforeEach(() => {
        student = new Student(
            new Date(),
            'jose',
            '123',
            []
        );

        const aValidBeginnig = new Date(2024, 7, 1, 0, 0, 0);
        const aValidEnding = new Date(2024, 10, 29, 0, 0, 0)
        period = new AcademicSemester(true, aValidBeginnig, aValidEnding);
    })

    it('should instantiate a rating without errors', () => {
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        expect(rating.getNotification()?.getErrors().length).toBe(0);
        expect(rating.getId()).toBeDefined();
        expect(rating.getCreatedAt()).toBeDefined();
        expect(rating.getUpdatedAt()).toBeDefined();
        expect(rating.getDeletedAt()).toBeUndefined();
    });

    it('notification should inform period not defined', () => {
        let period;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: period of rating must be informed,')
    })

    it('notification should inform student not defined', () => {
        let student;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: student receiving rating must be informed,')
    })

    it('notification should inform dateRating not defined', () => {
        let date;
        const rating = new Rating(
            period,
            student,
            date,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: rating date must be informed,')
    })

    it('notification should inform listing not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            grade,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the listining skill must be informed,')
    })

    it('notification should inform writing not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            grade,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the writing skill must be informed,')
    })

    it('notification should inform reading not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            grade,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the reading skill must be informed,')
    })

    it('notification should inform speaking not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            grade,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the speaking skill must be informed,')
    })

    it('notification should inform grammar not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            grade,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the grammar skill must be informed,')
    })

    it('notification should inform homework not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            grade,
            Grade.BAD,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the homework commitment must be informed,')
    })

    it('notification should inform homework not defined', () => {
        let grade;
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            grade,
        );
        expect(rating.getNotification()?.getErrors().length).toBe(1);
        expect(rating.getNotification()?.messages()).toBe('rating: the vocabulary improvment must be informed,')
    })

    it('should have at leat one comment', () => {
        let comment = new Comment("comment", '123', new Date());
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        rating.setComments(comment)
        expect(rating).toBeDefined();
        expect(rating.getComments().length).toBe(1)

    });

    it('should get a comment', () => {
        let comment = new Comment("comment", '123', new Date());
        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        rating.setComments(comment)
        expect(rating).toBeDefined();
        expect(rating.getComments().length).toBe(1);
        const result = rating.getComments()[0]
        expect(result).toEqual(comment)
    });

    it('should get the period', () => {

        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getAcademicSemester()
        expect(result).toEqual(period)
    });

    it('should get the period', () => {

        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getStudent()
        expect(result).toEqual(student)
    });

    it('should get the student', () => {

        const rating = new Rating(
            period,
            student,
            new Date(),
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getStudent()
        expect(result).toEqual(student)
    });

    it('should get the date rating', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getRatingDate()
        expect(result).toEqual(dateRating)
    });

    it('should get the listining skill', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getListing()
        expect(result).toEqual(Grade.BAD)
    });

    it('should get the writing skill', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getWriting()
        expect(result).toEqual(Grade.BAD)
    });

    it('should get the reading skill', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getReading()
        expect(result).toEqual(Grade.BAD)
    });

    it('should get the speaking skill', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getSpeaking()
        expect(result).toEqual(Grade.BAD)
    });

    it('should get the grammar skill', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getGrammar()
        expect(result).toEqual(Grade.BAD)
    });

    it('should get the homework commitment', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getHomework()
        expect(result).toEqual(Grade.BAD)
    });

    it('should get the vocabulary improvment', () => {
        let dateRating = new Date()
        const rating = new Rating(
            period,
            student,
            dateRating,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
            Grade.BAD,
        );
        expect(rating).toBeDefined();
        const result = rating.getVocabulary()
        expect(result).toEqual(Grade.BAD)
    });
})