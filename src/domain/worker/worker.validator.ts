import { Validator } from "../@shared/validation/validator.interface";
import { Worker } from './worker'
import * as yup from 'yup'

export class WorkerValidator implements Validator<Worker>{

    validate(entity: Worker): void {
        try {
            yup.object()
                .shape({
                    name : yup.string().required('Name should not be null'),
                    birthDay: yup.date().required('Birthday should not be null'),
                    role: yup.string().required('Role should not be null')
                })
                .validateSync({
                    name: entity.getName(),
                    birthDay: entity.getBirthday(),
                    role: entity.getRole(),
                },{
                    abortEarly: false
                })
        } catch (error) {
            const err = error as yup.ValidationError;
            err.errors.forEach(element => {
                entity.getNotification()?.addError({
                    context: 'teacher',
                    message: element
                });
            })
        }
    }
    
}