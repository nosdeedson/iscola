"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidator = void 0;
const yup = require("yup");
class StudentValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                name: yup.string().required('Name should not be null'),
                birthday: yup.date().required('Birthday should not be null'),
                enrolled: yup.string().required('Enrolled should not be null'),
                parents: yup.array().min(1)
            })
                .validateSync({
                name: entity.name,
                birthday: entity.birthday,
                enrolled: entity.enrolled,
                parents: entity.parents
            }, {
                abortEarly: false
            });
        }
        catch (error) {
            const err = error;
            err.errors.forEach(element => {
                entity.notification?.addError({
                    context: 'student',
                    message: element
                });
            });
        }
    }
}
exports.StudentValidator = StudentValidator;
//# sourceMappingURL=student.validator.js.map