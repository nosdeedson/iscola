"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidator = void 0;
const yup = require("yup");
class CommentValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                comment: yup.string().required('add a comment'),
                idPersonHadDone: yup.number().required('id of the person that have done the comment'),
                commentDate: yup.date().required('inform the date of the comment')
            })
                .validateSync({
                comment: entity.comment,
                idPersonHadDone: entity.idPersonHadDone,
                commentDate: entity.commentDate
            }, {
                abortEarly: false
            });
        }
        catch (error) {
            const err = error;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'comment',
                    message: it
                });
            });
        }
    }
}
exports.CommentValidator = CommentValidator;
//# sourceMappingURL=comment.validator.js.map