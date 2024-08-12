import { Validator } from '../@shared/validation/validator.interface'
import * as yup from 'yup'
import { Comment } from './comment';

export class CommentValidator implements Validator<Comment>{

    validate(entity: Comment): void {
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
                },{
                    abortEarly: false
                })
        } catch (error) {
            const err = error as yup.ValidationError;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'comment',
                    message: it
                })
            }) 
        }
    }
    
}