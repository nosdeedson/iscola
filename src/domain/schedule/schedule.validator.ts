import { lastDayOfWeek } from "date-fns";
import { Validator } from "../@shared/validation/validator.interface";
import { Schedule } from "./schedule";
import * as yup from 'yup'

export class ScheduleValidator implements Validator<Schedule> {

    validate(entity: Schedule): void {

        try {
            yup.object()
                .shape({
                    dayOfWeek: yup.array().min(2).max(2),
                    time: yup.array().min(2).max(2),
                })
                .validateSync({
                    dayOfWeek: entity.getDayOfWeek(),
                    time: entity.getTime()
                },
                    {
                        abortEarly: false
                    }
                );
        } catch (error) {
            const err = error as yup.ValidationError;
            err.errors.forEach(it => {
                entity.getNotification()?.addError({
                    context: 'schedule',
                    message: it
                })
            });
        }
    }

}