import { ChildEntity, Column, OneToMany } from "typeorm";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { PersonModel } from "../@shared/person.model";
import { ClassModel } from "../class/class.model";
import { Worker } from "src/domain/worker/worker";

@ChildEntity()
export class WokerModel extends PersonModel {

    constructor() { super() }

    @Column({
        nullable: false,
        type: 'enum',
        enum: [
            RoleEnum.ADMINISTRATOR,
            RoleEnum.TEACHER
        ]
    })
    role: RoleEnum;

    @OneToMany(() => ClassModel, (classes) => classes.teacher)
    classes: ClassModel[];

    static toWorkerModel(worker: Worker): WokerModel{
        if(!worker){
            return undefined;
        }
        let model = new WokerModel();
        model.birthday = worker.getBirthday();
        model.classes = ClassModel.toClassesModels(worker.getClasses());
        model.createdAt = worker.getCreatedAt();
        model.deletedAt = worker.getDeletedAt();
        model.fullName = worker.getName();
        model.id = worker.getId();
        model.role = worker.getRole();
        model.updatedAt = worker.getUpdatedAt();
        return model;
    }
}
