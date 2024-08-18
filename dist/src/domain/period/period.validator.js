"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodValidator = void 0;
const yup = require("yup");
const date_fns_1 = require("date-fns");
class PeriodValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                actual: yup.boolean().required('must inform period as actual'),
                beginningDate: yup.date().required('period date beginning must be informed'),
                endingDate: yup.date().required('period date ending must be informed')
            })
                .validateSync({
                actual: entity.actual,
                beginningDate: entity.beginningDate,
                endingDate: entity.endingDate
            }, {
                abortEarly: false
            });
            if ((0, date_fns_1.isAfter)(entity.beginningDate, entity.endingDate)) {
                entity.notification?.addError({
                    context: 'period',
                    message: 'the beginning date must be before ending date'
                });
            }
            if ((0, date_fns_1.isBefore)(entity.endingDate, entity.beginningDate)) {
                entity.notification?.addError({
                    context: 'period',
                    message: 'the ending date must be after beginning date'
                });
            }
            if ((0, date_fns_1.isWeekend)(entity.beginningDate)) {
                entity.notification?.addError({
                    context: 'period',
                    message: 'the period must start in a weekday'
                });
            }
            if ((0, date_fns_1.isWeekend)(entity.endingDate)) {
                entity.notification?.addError({
                    context: 'period',
                    message: 'the period must end in a weekday'
                });
            }
        }
        catch (error) {
            let err = error;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'period',
                    message: it
                });
            });
        }
    }
}
exports.PeriodValidator = PeriodValidator;
//# sourceMappingURL=period.validator.js.map