import { ChildEntity, Column, OneToMany } from "typeorm";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { PersonModel } from "../@shared/person.model";
import { ClassModel } from "../class/class.model";

@ChildEntity('worker')
export class WorkerModel extends PersonModel {

    constructor(){
         super();
         if(!this.classes)
            this.classes = []
    }

    @Column({
        nullable: true,
        type: 'enum',
        enum: [
            RoleEnum.ADMINISTRATOR,
            RoleEnum.TEACHER
        ]
    })
    role: RoleEnum;

    @OneToMany(() => ClassModel, (classes) => classes.teacher)
    classes: ClassModel[];

    static toWorkerModel(worker: Worker, classEntity: ClassModel): WorkerModel{
      
        if(!worker){
            return undefined;
        }
        let model = new WorkerModel();
        model.birthday = worker.getBirthday();
        model.classes.push(classEntity)
        model.createdAt = worker.getCreatedAt();
        model.deletedAt = worker.getDeletedAt();
        model.fullName = worker.getName();
        model.id = worker.getId();
        model.role = worker.getRole();
        model.updatedAt = worker.getUpdatedAt();
        return model;
    }
}
