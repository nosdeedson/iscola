"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingValidator = void 0;
const yup = require("yup");
class RatingValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                period: yup.object().required('period of rating must be informed'),
                student: yup.object().required('student receiving rating must be informed'),
                ratingDate: yup.date().required('rating date must be informed'),
                listing: yup.string().required('the listining skill must be informed'),
                writing: yup.string().required('the writing skill must be informed'),
                reading: yup.string().required('the reading skill must be informed'),
                speaking: yup.string().required('the speaking skill must be informed'),
                grammar: yup.string().required('the grammar skill must be informed'),
                homework: yup.string().required('the homework commitment must be informed'),
                vocabulary: yup.string().required('the vocabulary improvment must be informed'),
            })
                .validateSync({
                period: entity.period,
                student: entity.student,
                ratingDate: entity.ratingDate,
                listing: entity.listing,
                writing: entity.writing,
                reading: entity.reading,
                speaking: entity.speaking,
                grammar: entity.grammar,
                homework: entity.homework,
                vocabulary: entity.vocabulary
            }, {
                abortEarly: false
            });
        }
        catch (error) {
            const err = error;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'rating',
                    message: it
                });
            });
        }
    }
}
exports.RatingValidator = RatingValidator;
//# sourceMappingURL=rating.validator.js.map