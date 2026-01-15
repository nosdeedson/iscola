import { Validator } from "../@shared/validation/validator.interface";
import { Schedule } from "./schedule";
import * as yup from 'yup'

export class ScheduleValidator implements Validator<Schedule> {

    validate(entity: Schedule): void {

        try {
            yup.object()
                .shape({
                    dayOfWeek: yup.array().length(2, 'must inform two days for the lessons'),
                })
                .validateSync({
                    dayOfWeek: entity.getDayOfWeek(),
                },
                    {
                        abortEarly: false
                    }
                );

            if(entity.getTimes().size < 2){
                entity.notification?.addError({
                    context: 'schedule',
                    message: 'inform twos times for the lessons'
                })
            }
        } catch (error) {
            const err = error as yup.ValidationError;
            err.errors.forEach(it => {
                entity.notification?.addError({
                    context: 'schedule',
                    message: it
                })
            });
            if(entity.getTimes().size < 2){
                entity.notification?.addError({
                    context: 'schedule',
                    message: 'inform twos times for the lessons'
                })
            }
        }
    }

}