"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentValidator = void 0;
const yup = require("yup");
class ParentValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                name: yup.string().required('Name should not be null'),
                birthday: yup.string().required('Birthday should not be null'),
                students: yup.array().min(1),
            })
                .validateSync({
                name: entity.name,
                birthday: entity.birthday,
                students: entity.students
            }, { abortEarly: false });
        }
        catch (error) {
            const err = error;
            err.errors.forEach(element => {
                entity.notification?.addError({
                    context: 'parent',
                    message: element
                });
            });
        }
    }
}
exports.ParentValidator = ParentValidator;
//# sourceMappingURL=parent.validator.js.map