import { Worker } from "../../../domain/worker/worker";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Parent } from "../../../domain/parent/parent";
import { Student } from "../../../domain/student/student";
import { AccessType } from "../../../domain/user/access.type";
import { User } from "../../../domain/user/user";
import { GenericModel } from "../@shared/generic.model/generic.model";
import { PersonModel } from "../@shared/person.model";
import { ParentUserConverter } from "../parent/parent.user.converter";
import { StudentUserConverter } from "../student/student.user.converter";
import { WorkerUserconverter } from "../worker/worker.user.converter";


@Entity('user')
export class UserModel extends GenericModel{

    @Column({
        nullable: false,
        name: 'email'
    })
    email: string;

    @Column({
        nullable: false,
        name: 'password',
    })
    password: string;

    @Column({
        nullable: false,
        name: 'access_type'
    })
    accesType: AccessType;

    @OneToOne(() => PersonModel)
    @JoinColumn()
    person: PersonModel;

    static toUserModel(user: User): UserModel{
        let userModel = new UserModel();
        userModel.createdAt = user.getCreatedAt();
        userModel.deletedAt = user.getDeletedAt();
        userModel.email = user.getEmail();
        userModel.id = user.getId();
        userModel.password = user.getPassword();
        if(user.getAccessType() == AccessType.ADMIN){
            userModel.person = new WorkerUserconverter().converter(user.getPerson() as Worker);
        } else if(user.getAccessType() == AccessType.PARENT){
            userModel.person = new ParentUserConverter().converter(user.getPerson() as Parent);
        } else if(user.getAccessType() == AccessType.STUDENT){
            userModel.person = new StudentUserConverter().converter(user.getPerson() as Student);
        } else if(user.getAccessType() == AccessType.TEACHER) {
            userModel.person = new WorkerUserconverter().converter(user.getPerson() as Worker)
        } else {
            throw new Error("access type does not exist")
        }
        userModel.updatedAt = user.getUpdatedAt();
        userModel.accesType = user.getAccessType();

        return userModel;
    }

}