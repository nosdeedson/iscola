import { Validator } from "../@shared/validation/validator.interface";
import { Parent } from "./parent";
import * as yup from 'yup'

export class ParentValidator implements Validator<Parent>{

    validate(entity: Parent): void {
        try {
            yup.object()
                .shape({
                    name: yup.string().required('Name should not be null'),
                    birthday: yup.string().required('Birthday should not be null'),
                    students: yup.array().min(1),
                })
                .validateSync({
                    name: entity.name,
                    birthday: entity.birthday,
                    students: entity.students
                },
                {abortEarly: false})
        } catch (error) {
            const err = error as yup.ValidationError
            err.errors.forEach(element => {
                entity.notification?.addError({
                    context: 'parent',
                    message: element
                })
            })
        }
    }
    
}