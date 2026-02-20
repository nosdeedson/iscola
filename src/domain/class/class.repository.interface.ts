import { ClassEntity } from "src/infrastructure/entities/class/class.entity";
import { RepositoryInterface } from "../@shared/repository/repository.interface";
import { ClassesOfTeacherDto } from "src/application/usecases/teacher-list-classes-usecase/classes-of-teacher-dto";

export interface ClassRepositoryInterface extends RepositoryInterface<ClassEntity>{
    findByClassCode(classCode: string): Promise<ClassEntity>;
    findByTeacherId(id: string): Promise<ClassEntity[]>;
}