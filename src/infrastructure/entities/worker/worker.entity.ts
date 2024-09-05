import { ChildEntity, Column, OneToMany } from "typeorm";
import { RoleEnum } from "../../../domain/worker/roleEnum";
import { Worker } from "../../../domain/worker/worker";
import { PersonEntity } from "../@shared/person.entity";
import { ClassEntity } from "../class/class.entity";

@ChildEntity('worker')
export class WorkerEntity extends PersonEntity {

    constructor(){
         super();
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

    @OneToMany(() => ClassEntity, (classes) => classes.teacher)
    classes: ClassEntity[];

    static toWorkerEntity(worker: Worker, classEntity?: ClassEntity): WorkerEntity{
      
        if(!worker){
            return undefined;
        }
        let model = new WorkerEntity();
        model.birthday = worker.getBirthday();
        if(!model.classes){
            model.classes = []
        }
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
