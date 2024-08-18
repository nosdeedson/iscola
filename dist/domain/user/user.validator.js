"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const yup = require("yup");
class UserValidator {
    validate(entity) {
        try {
            yup.object()
                .shape({
                person: yup.object().required('Person of user is undefined'),
                email: yup.string().required('email of user is undefined'),
                nickname: yup.string().required('nickname of user is undefined'),
                password: yup.string().required('password of user is undefined'),
                accessType: yup.string().required('accessType of user is undefined'),
            })
                .validateSync({
                person: entity.getPerson(),
                email: entity.getEmail(),
                nickname: entity.getNickname(),
                password: entity.getPassword(),
                accessType: entity.getAccessType(),
            }, {
                abortEarly: false
            });
        }
        catch (error) {
            let err = error;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'user',
                    message: it
                });
            });
        }
    }
}
exports.UserValidator = UserValidator;
//# sourceMappingURL=user.validator.js.map