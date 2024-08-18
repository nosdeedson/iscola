"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherValidator = void 0;
const yup = require("yup");
class TeacherValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                name: yup.string().required('Name should not be null'),
                birthDay: yup.date().required('Birthday should not be null'),
                role: yup.string().required('Role should not be null')
            })
                .validateSync({
                name: entity.name,
                birthDay: entity.birthday,
                role: entity.role
            }, {
                abortEarly: false
            });
        }
        catch (error) {
            const err = error;
            err.errors.forEach(element => {
                entity.notification?.addError({
                    context: 'teacher',
                    message: element
                });
            });
        }
    }
}
exports.TeacherValidator = TeacherValidator;
//# sourceMappingURL=worker.validator.js.map