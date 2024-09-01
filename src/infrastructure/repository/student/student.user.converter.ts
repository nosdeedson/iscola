import { Student } from "src/domain/student/student";
import { UserConverter } from "../@shared/user-converter/user.converter.interface";
import { StudentModel } from "./student.model";

export class StudentUserConverter implements UserConverter<Student> {

    converter(entity: Student): StudentModel {
        return StudentModel.toStudentModel(entity);
    }

}