"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomValidator = void 0;
const yup = require("yup");
class ClassroomValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                classroomCode: yup.string().required('Classroom code is required'),
                nameBook: yup.string().required('Name of the book is required'),
                name: yup.string().required('Name of the class is required'),
                firstDayOfWeek: yup.string().required('First day of lessons is required'),
                secondDayOfWeek: yup.string().required('Second day of lessons is required'),
                time: yup.string().required('Time of lessons is required'),
            })
                .validateSync({
                classroomCode: entity.classroomCode,
                name: entity.name,
                nameBook: entity.nameBook,
                firstDayOfWeek: entity.firstDayOfWeek,
                secondDayOfWeek: entity.secondDayOfWeek,
                time: entity.time
            }, {
                abortEarly: false
            });
            if (entity.firstDayOfWeek === 'Sunday' || entity.firstDayOfWeek === 'Saturday') {
                entity.notification?.addError({ context: 'classroom', message: 'firstDayOfWeek must be a weekday' });
            }
            if (entity.secondDayOfWeek === 'Sunday' || entity.secondDayOfWeek === 'Saturday') {
                entity.notification?.addError({ context: 'classroom', message: 'secondDayOfWeek must be a weekday' });
            }
        }
        catch (error) {
            const err = error;
            err.errors.forEach(element => {
                entity.notification?.addError({
                    context: 'classroom',
                    message: element
                });
            });
        }
    }
}
exports.ClassroomValidator = ClassroomValidator;
//# sourceMappingURL=classroom.validator.js.map