"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const entity_1 = require("../@shared/entity");
const comment_validator_1 = require("./comment.validator");
class Comment extends entity_1.Entity {
    constructor(comment, idPersonHadDone, commentDate, id, createdAt, updatedAt, deletedAt) {
        super(id, createdAt, updatedAt, deletedAt);
        this.comment = comment;
        this.idPersonHadDone = idPersonHadDone;
        this.commentDate = commentDate;
        this.validate();
    }
    validate() {
        new comment_validator_1.CommentValidator().validate(this);
    }
    getComment() {
        return this.comment;
    }
    getIdPersonHadDone() {
        return this.idPersonHadDone;
    }
    getCommentDate() {
        return this.commentDate;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map