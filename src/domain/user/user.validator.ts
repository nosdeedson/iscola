import { eachMinuteOfInterval } from 'date-fns';
import { Validator } from '../@shared/validation/validator.interface';
import { User } from '../user/user'
import * as yup from 'yup';

export class UserValidator implements Validator<User> {

    validate(entity: User): void {
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
                    person : entity.getPerson(),
                    email : entity.getEmail(),
                    nickname : entity.getNickname(),
                    password : entity.getPassword(),
                    accessType : entity.getAccessType(),
                },{
                    abortEarly: false
                })
        } catch (error) {
            let err = error as yup.ValidationError;
            err.errors.forEach(it => {
                entity.getNotification()?.addError({
                    context: 'user',
                    message: it
                })
            })
        }
    }

}