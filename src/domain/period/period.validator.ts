import { Validator } from '../@shared/validation/validator.interface'
import { Period } from './period';
import * as yup from 'yup'
import { isAfter, isBefore, isWeekend } from 'date-fns';

export class PeriodValidator implements Validator<Period>{

    validate(entity: Period): void {
        try {
            yup.object()
                .shape({
                    actual : yup.boolean().required('must inform period as actual'),
                    beginningDate : yup.date().required('period date beginning must be informed'),
                    endingDate : yup.date().required('period date ending must be informed')
                })
                .validateSync({
                    actual : entity.actual,
                    beginningDate : entity.beginningDate,
                    endingDate: entity.endingDate
                },{
                    abortEarly: false
                })
                if(isAfter(entity.beginningDate, entity.endingDate)){
                    entity.notification?.addError({
                        context: 'period',
                        message: 'the beginning date must be before ending date'
                    })
                }
                if(isBefore(entity.endingDate, entity.beginningDate)){
                    entity.notification?.addError({
                        context: 'period',
                        message: 'the ending date must be after beginning date'
                    })
                }
                if(isWeekend(entity.beginningDate)){
                    entity.notification?.addError({
                        context: 'period',
                        message: 'the period must start in a weekday'
                    })
                }
                if(isWeekend(entity.endingDate)){
                    entity.notification?.addError({
                        context: 'period',
                        message: 'the period must end in a weekday'
                    })
                }
        } catch (error) {
            let err = error as yup.ValidationError;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'period',
                    message: it
                })
            })
        }
    }

}