import { Comment } from "./comment"

describe('Comment unit tests', () =>{

    it('should instantiate a comment without errors', () =>{
        let comment = new Comment("comment", '123');
        expect(comment).toBeDefined();
        expect(comment.getCreatedAt()).toBeDefined();
        expect(comment.getUpdatedAt()).toBeDefined();
        expect(comment.getDeletedAt()).toBeUndefined();
        expect(comment.getId()).toBeDefined();

    })

    it('should have an error if comment is empty', () =>{
        let comment;
        let idPersonHadDone = '123';
        let entity = new Comment(comment, idPersonHadDone);
        expect(entity.getNotification()?.getErrors().length).toBe(1);
        expect(entity.getNotification()?.messages()).toBe("comment: add a comment,")
    })

    it('should have an error if idPersonHadDone is not defined', () =>{
        let comment = 'comment';
        let idPersonHadDone;
        let entity = new Comment(comment, idPersonHadDone);
        expect(entity.getNotification()?.getErrors().length).toBe(1);
        expect(entity.getNotification()?.messages()).toBe("comment: id of the person that have done the comment,")
    })

    it('should get a comment', () =>{
        let comment = new Comment("comment", '123');
        expect(comment).toBeDefined();
        let resullt = comment.getComment()
        expect(resullt).toBe('comment');
    })

    it('should get id person had done the comment', () =>{
        let comment = new Comment("comment", '123');
        expect(comment).toBeDefined();
        let resullt = comment.getIdPersonHadDone()
        expect(resullt).toBe('123');
    })

    it('should get date of the comment', () =>{
        let dateComment = new Date()
        let comment = new Comment("comment", '123');
        expect(comment).toBeDefined();
    })

})