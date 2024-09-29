import { Validator } from '../@shared/validation/validator.interface'
import { AcademicSemester } from './academic.semester';
import * as yup from 'yup'
import { isAfter, isBefore, isWeekend, isEqual } from 'date-fns';

export class AcademicSemesterValidator implements Validator<AcademicSemester>{

    validate(entity: AcademicSemester): void {
        try {
            yup.object()
                .shape({
                    actual : yup.boolean().required('must inform academicSemester as actual'),
                    beginningDate : yup.date().required('academicSemester date beginning must be informed'),
                    endingDate : yup.date().required('academicSemester date ending must be informed')
                })
                .validateSync({
                    actual : entity.getActual(),
                    beginningDate : entity.getBeginningDate(),
                    endingDate: entity.getEndingDate()
                },{
                    abortEarly: false
                })
                if(isAfter(entity.getBeginningDate(), entity.getEndingDate())){
                    entity.getNotification()?.addError({
                        context: 'academicSemester',
                        message: 'the beginning date must be before ending date'
                    })
                }
                if(isBefore(entity.getEndingDate(), entity.getBeginningDate())){
                    entity.getNotification()?.addError({
                        context: 'academicSemester',
                        message: 'the ending date must be after beginning date'
                    })
                }
                if(isWeekend(entity.getBeginningDate())){
                    entity.getNotification()?.addError({
                        context: 'academicSemester',
                        message: 'the academicSemester must start in a weekday'
                    })
                }
                if(isWeekend(entity.getEndingDate())){
                    entity.getNotification()?.addError({
                        context: 'academicSemester',
                        message: 'the academicSemester must end in a weekday'
                    })
                }
                if(isEqual(entity.getBeginningDate(), entity.getEndingDate())){
                    entity.getNotification()?.addError({
                        context: 'academicSemester',
                        message: 'the beggning and the end of the semester can not be equal'
                    })
                }
        } catch (error) {
            let err = error as yup.ValidationError;
            err.errors.forEach(it => {
                entity.getNotification()?.addError({
                    context: 'academicSemester',
                    message: it
                })
            })
        }
    }

}