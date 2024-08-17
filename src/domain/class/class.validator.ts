import * as yup from 'yup';
import { Validator } from "../@shared/validation/validator.interface";
import { Class } from "./class";

export class ClassValidator implements Validator<Class> {

    validate(entity: Class): void {
        try {
            yup.object()
                .shape({
                    classCode: yup.string().required('classcode is required'),
                    nameBook: yup.string().required('Name of the book is required'),
                    name: yup.string().required('Name of the class is required'),
                    schedule: yup.object().required('Schedule of the class is required'),
                })
                .validateSync({
                    classCode: entity.getClassCode(),
                    name: entity.getName(),
                    nameBook: entity.getNameBook(),
                    schedule: entity.getSchecule()
                },
                    {
                        abortEarly: false
                    }
                );
            if(!entity.getSchecule()){
                entity.getNotification()?.addError({ context: 'class', message: 'schedule is required' })
            } else{
                if(entity.getSchecule().getNotification().hasError()){
                    entity.getNotification()?.addError({ context: 'class', message: 'schedule is invalid' })
                }
                if (entity.getSchecule().getDayOfWeek()[0] === 'Sunday' || entity.getSchecule().getDayOfWeek()[0] === 'Saturday') {
                    entity.getNotification()?.addError({ context: 'class', message: 'schedule must be a weekday' })
                }
                if (entity.getSchecule().getDayOfWeek()[1] === 'Sunday' || entity.getSchecule().getDayOfWeek()[1] === 'Saturday') {
                    entity.getNotification()?.addError({ context: 'class', message: 'schedule must be a weekday' })
                }
                if (
                    entity.getSchecule().getDayOfWeek()[0] === entity.getSchecule().getDayOfWeek()[1]
                    && entity.getSchecule().getTime()[0] === entity.getSchecule().getTime()[1]
                ) {
                    entity.getNotification()?.addError({ context: 'class', message: 'time must be different when day of week are equal' })
                }
            }
        } catch (error) {
            const err = error as yup.ValidationError
            err.errors.forEach(element => {
                entity.getNotification()?.addError({
                    context: 'class',
                    message: element
                })
            })
        }
    }

}