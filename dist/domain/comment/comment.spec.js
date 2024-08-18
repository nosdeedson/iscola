"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("./comment");
describe('Comment unit tests', () => {
    it('should instantiate a comment without errors', () => {
        let comment = new comment_1.Comment("comment", 1, new Date());
        expect(comment).toBeDefined();
        expect(comment.createdAt).toBeDefined();
        expect(comment.updatedAt).toBeDefined();
        expect(comment.deletedAt).toBeUndefined();
        expect(comment.id).toBeDefined();
    });
    it('should have an error if comment is empty', () => {
        let comment;
        let idPersonHadDone = 1;
        let commentDate = new Date();
        let entity = new comment_1.Comment(comment, idPersonHadDone, commentDate);
        expect(entity.notification?.getErrors().length).toBe(1);
        expect(entity.notification?.messages()).toBe("comment: add a comment,");
    });
    it('should have an error if idPersonHadDone is not defined', () => {
        let comment = 'comment';
        let idPersonHadDone;
        let commentDate = new Date();
        let entity = new comment_1.Comment(comment, idPersonHadDone, commentDate);
        expect(entity.notification?.getErrors().length).toBe(1);
        expect(entity.notification?.messages()).toBe("comment: id of the person that have done the comment,");
    });
    it('should have an error if commentDate is not defined', () => {
        let comment = 'comment';
        let idPersonHadDone = 1;
        let commentDate;
        let entity = new comment_1.Comment(comment, idPersonHadDone, commentDate);
        expect(entity.notification?.getErrors().length).toBe(1);
        expect(entity.notification?.messages()).toBe("comment: inform the date of the comment,");
    });
    it('should have an error if commentDate is not defined', () => {
        let comment;
        let idPersonHadDone;
        let commentDate;
        let entity = new comment_1.Comment(comment, idPersonHadDone, commentDate);
        expect(entity.notification?.getErrors().length).toBe(3);
        expect(entity.notification?.messages()).toBe("comment: inform the date of the comment,comment: add a comment,comment: id of the person that have done the comment,");
    });
    it('should get a comment', () => {
        let comment = new comment_1.Comment("comment", 1, new Date());
        expect(comment).toBeDefined();
        let resullt = comment.getComment();
        expect(resullt).toBe('comment');
    });
    it('should get id person had done the comment', () => {
        let comment = new comment_1.Comment("comment", 1, new Date());
        expect(comment).toBeDefined();
        let resullt = comment.getIdPersonHadDone();
        expect(resullt).toBe(1);
    });
    it('should get date of the comment', () => {
        let dateComment = new Date();
        let comment = new comment_1.Comment("comment", 1, dateComment);
        expect(comment).toBeDefined();
        let resullt = comment.getCommentDate();
        expect(resullt).toEqual(dateComment);
    });
});
//# sourceMappingURL=comment.spec.js.map