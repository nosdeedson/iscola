import { Validator } from "../@shared/validation/validator.interface";
import { Class } from "./class";
import * as yup from 'yup'

export class ClassValidator implements Validator<Class> {

    validate(entity: Class): void {
        try {
            yup.object()
                .shape({
                    classCode: yup.string().required('classcode is required'),
                    nameBook: yup.string().required('Name of the book is required'),
                    name: yup.string().required('Name of the class is required'),
                    firstDayOfWeek: yup.string().required('First day of lessons is required'),
                    secondDayOfWeek: yup.string().required('Second day of lessons is required'),
                    time: yup.string().required('Time of lessons is required'),
                })
                .validateSync({
                    classCode: entity.classCode,
                    name: entity.name,
                    nameBook: entity.nameBook,
                    firstDayOfWeek: entity.firstDayOfClassInWeek,
                    secondDayOfWeek: entity.secondDayOfClassInWeek,
                    time: entity.time
                },
                    {
                        abortEarly: false
                    }
                );
            if(entity.firstDayOfClassInWeek === 'Sunday' || entity.firstDayOfClassInWeek === 'Saturday'){
                entity.notification?.addError({context: 'class', message: 'firstDayOfWeek must be a weekday'})
            }
            if(entity.secondDayOfClassInWeek === 'Sunday' || entity.secondDayOfClassInWeek === 'Saturday'){
                entity.notification?.addError({context: 'class', message: 'secondDayOfWeek must be a weekday'})
            }
        } catch (error) {
            const err = error as yup.ValidationError
            err.errors.forEach(element => {
                entity.notification?.addError({
                    context: 'class',
                    message: element
                })
            })
        }
    }

}